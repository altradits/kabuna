import { describe, expect, it, vi } from "vitest";
import {
  getCategories,
  getCategory,
  getCategoryProducts,
} from "@/lib/data/categories";

vi.mock("next/cache", () => ({
  cacheLife: vi.fn(),
  cacheTag: vi.fn(),
}));

vi.mock("@/lib/spree", () => ({
  getClient: vi.fn(() => ({
    categories: {
      list: vi.fn().mockRejectedValue(new Error("offline")),
      get: vi.fn().mockRejectedValue(new Error("offline")),
    },
    products: {
      list: vi.fn().mockRejectedValue(new Error("offline")),
    },
  })),
  getLocaleOptions: vi.fn().mockResolvedValue({ locale: "en", country: "us" }),
  getAccessToken: vi.fn().mockResolvedValue(undefined),
}));

describe("Coffee Category & Scalable Taxonomy", () => {
  it("returns Coffee and Ceremony as top-level root categories", async () => {
    const res = await getCategories();
    expect(res.data).toBeDefined();
    expect(res.data.length).toBe(2);

    const names = res.data.map((c) => c.name);
    expect(names).toContain("Coffee");
    expect(names).toContain("Ceremony & Accessories");
  });

  it("classifies subcategories under Coffee", async () => {
    const coffeeCategory = await getCategory("coffee");
    expect(coffeeCategory).toBeDefined();
    expect(coffeeCategory.id).toBe("cat_coffee");
    expect(coffeeCategory.name).toBe("Coffee");
    expect(coffeeCategory.children).toBeDefined();

    const childNames = coffeeCategory.children?.map((c) => c.name);
    expect(childNames).toContain("Single Origin Varieties");
    expect(childNames).toContain("Washed Process");
    expect(childNames).toContain("Natural Process");
    expect(childNames).toContain("Roast Profiles");
    expect(childNames).toContain("Green Coffee (Unroasted)");
  });

  it("lists all coffee products when Coffee category is selected", async () => {
    const res = await getCategoryProducts("cat_coffee");
    expect(res.data).toBeDefined();
    expect(res.data.length).toBe(10);

    const productNames = res.data.map((p) => p.name);
    expect(productNames).toEqual(
      expect.arrayContaining([
        "Chelbesa",
        "Hamasho",
        "Dimtu Tora",
        "Benti Neka",
        "Worku Buche",
        "Uraga",
        "Harrar Wild Horse",
        "Kaffa Ancient Forest",
        "Djimmah Traditional Roast",
        "Yirgacheffe Raw Green Coffee",
      ]),
    );

    // Verifies that ceremony items are not in the Coffee category
    expect(productNames).not.toContain("Jebena");
    expect(productNames).not.toContain("Cini");
    expect(productNames).not.toContain("Rekebot");
    expect(productNames).not.toContain("Girgira");
    expect(productNames).not.toContain("Menkeskesha");
    expect(productNames).not.toContain("Mukecha & Zenezena");
    expect(productNames).not.toContain("Jebena Ceremony Kit");
  });

  it("lists ceremony items under Ceremony category", async () => {
    const res = await getCategoryProducts("buna-ceremony");
    expect(res.data).toBeDefined();
    expect(res.data.length).toBe(7);

    const productNames = res.data.map((p) => p.name);
    expect(productNames).toContain("Jebena");
    expect(productNames).toContain("Jebena Ceremony Kit");
    expect(productNames).not.toContain("Chelbesa");
  });

  it("correctly filters subcategories like Washed and Natural", async () => {
    const washedRes = await getCategoryProducts("washed");
    expect(washedRes.data.length).toBeGreaterThan(0);
    const washedNames = washedRes.data.map((p) => p.name);
    expect(washedNames).toContain("Chelbesa");
    expect(washedNames).toContain("Benti Neka");

    const naturalRes = await getCategoryProducts("natural");
    expect(naturalRes.data.length).toBeGreaterThan(0);
    const naturalNames = naturalRes.data.map((p) => p.name);
    expect(naturalNames).toContain("Hamasho");
    expect(naturalNames).toContain("Dimtu Tora");
  });
});

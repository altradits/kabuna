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
  it("returns Coffee, Hair, and Ceremony as top-level root categories", async () => {
    const res = await getCategories();
    expect(res.data).toBeDefined();
    expect(res.data.length).toBe(3);

    const names = res.data.map((c) => c.name);
    expect(names).toContain("Coffee");
    expect(names).toContain("Organic Hair Care");
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

    // Verifies neither hair nor ceremony items leak into Coffee
    expect(productNames).not.toContain("YeTsehur Kibe");
    expect(productNames).not.toContain("Jebena");
  });

  it("classifies subcategories under Hair", async () => {
    const hairCategory = await getCategory("hair");
    expect(hairCategory).toBeDefined();
    expect(hairCategory.id).toBe("cat_hair");
    expect(hairCategory.name).toBe("Organic Hair Care");
    expect(hairCategory.children).toBeDefined();
    expect(hairCategory.children?.length).toBe(5);

    const childNames = hairCategory.children?.map((c) => c.name);
    expect(childNames).toContain("Herbal Butters & Balms");
    expect(childNames).toContain("Scalp Oils & Elixirs");
    expect(childNames).toContain("Botanical Cleansers");
    expect(childNames).toContain("Treatments & Masks");
    expect(childNames).toContain("Wooden Combs & Accessories");
  });

  it("lists all hair products when Hair category is selected", async () => {
    const res = await getCategoryProducts("cat_hair");
    expect(res.data).toBeDefined();
    expect(res.data.length).toBe(5);

    const productNames = res.data.map((p) => p.name);
    expect(productNames).toEqual(
      expect.arrayContaining([
        "YeTsehur Kibe",
        "Koseret & Nug Scalp Elixir",
        "Endod Botanical Cleanser",
        "Shuruba Deep Conditioning Mask",
        "Wanza Carved Hair Comb",
      ]),
    );

    // Verifies neither coffee nor ceremony wares leak into hair
    expect(productNames).not.toContain("Chelbesa");
    expect(productNames).not.toContain("Jebena");
  });

  it("filters hair subcategories accurately", async () => {
    const buttersRes = await getCategoryProducts("hair/butters");
    expect(buttersRes.data.length).toBe(1);
    expect(buttersRes.data[0].name).toBe("YeTsehur Kibe");

    const oilsRes = await getCategoryProducts("hair/oils");
    expect(oilsRes.data.length).toBe(1);
    expect(oilsRes.data[0].name).toBe("Koseret & Nug Scalp Elixir");

    const cleansersRes = await getCategoryProducts("hair/cleansers");
    expect(cleansersRes.data.length).toBe(1);
    expect(cleansersRes.data[0].name).toBe("Endod Botanical Cleanser");

    const masksRes = await getCategoryProducts("hair/treatments");
    expect(masksRes.data.length).toBe(1);
    expect(masksRes.data[0].name).toBe("Shuruba Deep Conditioning Mask");

    const toolsRes = await getCategoryProducts("hair/tools");
    expect(toolsRes.data.length).toBe(1);
    expect(toolsRes.data[0].name).toBe("Wanza Carved Hair Comb");
  });

  it("lists ceremony items under Ceremony category", async () => {
    const res = await getCategoryProducts("buna-ceremony");
    expect(res.data).toBeDefined();
    expect(res.data.length).toBe(7);

    const productNames = res.data.map((p) => p.name);
    expect(productNames).toContain("Jebena");
    expect(productNames).toContain("Jebena Ceremony Kit");
    expect(productNames).not.toContain("Chelbesa");
    expect(productNames).not.toContain("YeTsehur Kibe");
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

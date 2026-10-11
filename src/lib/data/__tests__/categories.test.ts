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
  it("returns Coffee, Snacks, Hair, Body, and Gifts as top-level root categories", async () => {
    const res = await getCategories();
    expect(res.data).toBeDefined();
    expect(res.data.length).toBe(5);

    const names = res.data.map((c) => c.name);
    expect(names).toContain("Coffee");
    expect(names).toContain("Organic Snacks");
    expect(names).toContain("Organic Hair Care");
    expect(names).toContain("Organic Body");
    expect(names).toContain("Gifts");
    expect(names).not.toContain("Ceremony & Accessories");
  });

  it("classifies subcategories under Coffee", async () => {
    const coffeeCategory = await getCategory("coffee");
    expect(coffeeCategory).toBeDefined();
    expect(coffeeCategory.id).toBe("cat_coffee");
    expect(coffeeCategory.name).toBe("Coffee");
    expect(coffeeCategory.children).toBeDefined();

    const childNames = coffeeCategory.children?.map((c) => c.name);
    expect(childNames).toContain("Single Origin Varieties");
    expect(childNames).toContain("Ceremony & Accessories");
    expect(childNames).toContain("Washed Process");
    expect(childNames).toContain("Natural Process");
    expect(childNames).toContain("Roast Profiles");
    expect(childNames).toContain("Green Coffee (Unroasted)");
  });

  it("lists all coffee and ceremony products when Coffee category is selected", async () => {
    const res = await getCategoryProducts("cat_coffee");
    expect(res.data).toBeDefined();
    expect(res.data.length).toBe(17);

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
        "Jebena",
        "Cini",
        "Rekebot",
        "Girgira",
        "Menkeskesha",
        "Mukecha & Zenezena",
        "Jebena Ceremony Kit",
      ]),
    );

    // Verifies neither hair nor snack items leak into Coffee
    expect(productNames).not.toContain("YeTsehur Kibe");
    expect(productNames).not.toContain("Highland Heritage Kolo");
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

  it("lists ceremony items under Ceremony category via both buna-ceremony and coffee/ceremony", async () => {
    const res = await getCategoryProducts("buna-ceremony");
    expect(res.data).toBeDefined();
    expect(res.data.length).toBe(8);

    const resSub = await getCategoryProducts("coffee/ceremony");
    expect(resSub.data).toBeDefined();
    expect(resSub.data.length).toBe(8);

    const productNames = res.data.map((p) => p.name);
    expect(productNames).toContain("Jebena");
    expect(productNames).toContain("Jebena Ceremony Kit");
    expect(productNames).toContain("Sacred Buna Ceremony Itan Blend");
    expect(productNames).not.toContain("Chelbesa");
    expect(productNames).not.toContain("YeTsehur Kibe");
  });

  it("classifies subcategories under Snacks", async () => {
    const snacksCategory = await getCategory("snacks");
    expect(snacksCategory).toBeDefined();
    expect(snacksCategory.id).toBe("cat_snacks");
    expect(snacksCategory.name).toBe("Organic Snacks");
    expect(snacksCategory.children).toBeDefined();
    expect(snacksCategory.children?.length).toBe(5);

    const childNames = snacksCategory.children?.map((c) => c.name);
    expect(childNames).toContain("Heritage Kolo Grains");
    expect(childNames).toContain("Spiced Dabo Kolo");
    expect(childNames).toContain("Beso Energy Clusters");
    expect(childNames).toContain("Telba & Nug Seed Crisps");
    expect(childNames).toContain("Roasted Shimbra & Pulses");
  });

  it("lists all snack products when Snacks category is selected", async () => {
    const res = await getCategoryProducts("cat_snacks");
    expect(res.data).toBeDefined();
    expect(res.data.length).toBe(5);

    const productNames = res.data.map((p) => p.name);
    expect(productNames).toEqual(
      expect.arrayContaining([
        "Highland Heritage Kolo",
        "Berbere Spiced Dabo Kolo",
        "Wild Honey Beso Energy Clusters",
        "Toasted Telba & Nug Seed Crisps",
        "Crispy Smoked Shimbra",
      ]),
    );

    // Verifies neither coffee, hair, nor ceremony wares leak into snacks
    expect(productNames).not.toContain("Chelbesa");
    expect(productNames).not.toContain("YeTsehur Kibe");
    expect(productNames).not.toContain("Jebena");
  });

  it("filters snack subcategories accurately", async () => {
    const koloRes = await getCategoryProducts("snacks/kolo");
    expect(koloRes.data.length).toBe(1);
    expect(koloRes.data[0].name).toBe("Highland Heritage Kolo");

    const daboRes = await getCategoryProducts("snacks/dabo-kolo");
    expect(daboRes.data.length).toBe(1);
    expect(daboRes.data[0].name).toBe("Berbere Spiced Dabo Kolo");

    const besoRes = await getCategoryProducts("snacks/beso");
    expect(besoRes.data.length).toBe(1);
    expect(besoRes.data[0].name).toBe("Wild Honey Beso Energy Clusters");

    const seedsRes = await getCategoryProducts("snacks/seeds");
    expect(seedsRes.data.length).toBe(1);
    expect(seedsRes.data[0].name).toBe("Toasted Telba & Nug Seed Crisps");

    const pulsesRes = await getCategoryProducts("snacks/pulses");
    expect(pulsesRes.data.length).toBe(1);
    expect(pulsesRes.data[0].name).toBe("Crispy Smoked Shimbra");
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

  it("classifies subcategories under Body", async () => {
    const bodyCategory = await getCategory("body");
    expect(bodyCategory).toBeDefined();
    expect(bodyCategory.id).toBe("cat_body");
    expect(bodyCategory.name).toBe("Organic Body");
    expect(bodyCategory.children).toBeDefined();
    expect(bodyCategory.children?.length).toBe(6);

    const childNames = bodyCategory.children?.map((c) => c.name);
    expect(childNames).toContain("Highland Fragrances & Perfume Oils");
    expect(childNames).toContain("Restorative Herbal Ointments & Balms");
    expect(childNames).toContain("Botanical Body Washes & Cleansers");
    expect(childNames).toContain("Herbal Scents & Botanical Mists");
    expect(childNames).toContain("Volcanic Clay & Body Polishes");
    expect(childNames).toContain("Sacred Incense & Itan Resins");
  });

  it("lists all body & scent products when Body category is selected", async () => {
    const res = await getCategoryProducts("cat_body");
    expect(res.data).toBeDefined();
    expect(res.data.length).toBe(9);

    const productNames = res.data.map((p) => p.name);
    expect(productNames).toEqual(
      expect.arrayContaining([
        "Itan Boswellia Highland Perfume Oil",
        "Koseret & Enset Clarifying Body Wash",
        "Korarima & Black Cumin Warming Ointment",
        "Tenadam & Citrus Blossom Botanical Mist",
        "Rift Valley Volcanic Clay & Rosemary Body Polish",
        "Tigray White Boswellia Papyrifera Incense",
        "Ogaden Wild Commiphora Myrrha Resin",
        "Borena Black Frankincense (Tikur Itan)",
        "Sacred Buna Ceremony Itan Blend",
      ]),
    );

    // Verifies neither coffee, hair, nor snacks leak into body
    expect(productNames).not.toContain("Chelbesa");
    expect(productNames).not.toContain("YeTsehur Kibe");
    expect(productNames).not.toContain("Highland Heritage Kolo");
  });

  it("filters body & scent subcategories accurately", async () => {
    const fragranceRes = await getCategoryProducts("body/fragrances");
    expect(fragranceRes.data.length).toBe(1);
    expect(fragranceRes.data[0].name).toBe(
      "Itan Boswellia Highland Perfume Oil",
    );

    const ointmentRes = await getCategoryProducts("body/ointments");
    expect(ointmentRes.data.length).toBe(1);
    expect(ointmentRes.data[0].name).toBe(
      "Korarima & Black Cumin Warming Ointment",
    );

    const washRes = await getCategoryProducts("body/wash");
    expect(washRes.data.length).toBe(1);
    expect(washRes.data[0].name).toBe("Koseret & Enset Clarifying Body Wash");

    const mistRes = await getCategoryProducts("body/mists");
    expect(mistRes.data.length).toBe(1);
    expect(mistRes.data[0].name).toBe(
      "Tenadam & Citrus Blossom Botanical Mist",
    );

    const scrubRes = await getCategoryProducts("body/scrubs");
    expect(scrubRes.data.length).toBe(1);
    expect(scrubRes.data[0].name).toBe(
      "Rift Valley Volcanic Clay & Rosemary Body Polish",
    );

    const incenseRes = await getCategoryProducts("body/incense");
    expect(incenseRes.data.length).toBe(4);
    const incenseNames = incenseRes.data.map((p) => p.name);
    expect(incenseNames).toContain("Tigray White Boswellia Papyrifera Incense");
    expect(incenseNames).toContain("Ogaden Wild Commiphora Myrrha Resin");
    expect(incenseNames).toContain("Borena Black Frankincense (Tikur Itan)");
    expect(incenseNames).toContain("Sacred Buna Ceremony Itan Blend");
  });

  it("classifies Gifts category with zero subcategories (unified gift department)", async () => {
    const giftsCategory = await getCategory("gifts");
    expect(giftsCategory).toBeDefined();
    expect(giftsCategory.id).toBe("cat_gifts");
    expect(giftsCategory.name).toBe("Gifts");
    expect(giftsCategory.children).toBeDefined();
    expect(giftsCategory.children?.length).toBe(0);
  });

  it("lists all authentic Ethiopian gifts when Gifts category is selected", async () => {
    const res = await getCategoryProducts("cat_gifts");
    expect(res.data).toBeDefined();
    expect(res.data.length).toBe(12);

    const productNames = res.data.map((p) => p.name);
    expect(productNames).toEqual(
      expect.arrayContaining([
        "Gondar Hand-Painted Parchment Icon Art",
        "Lalibela Lost-Wax Cast Handheld Brass Cross",
        "Axum Hand-Hammered Silver Filigree Cuff",
        "Lalibela Solomonic Cross Signet Ring",
        "Habesha Silver Shuruba Hair Jewelry Set",
        "Harari Trade Amber & Coral Bangle",
        "Shemma Handwoven Cotton Bath Towel",
        "Artisanal Tibeb Embroidered Handkerchief Set",
        "Four-Layer Ethiopian Gabi Cloud Cotton Throw",
        "Wanza Carved Handheld Vanity Mirror",
        "Antique Ethiopian Brass Kohl & Scent Flask",
        "Harari Handwoven Mesob Trinket Box",
      ]),
    );

    // Verifies neither coffee, snacks, hair, nor body products leak into gifts
    expect(productNames).not.toContain("Chelbesa");
    expect(productNames).not.toContain("Highland Heritage Kolo");
    expect(productNames).not.toContain("YeTsehur Kibe");
    expect(productNames).not.toContain("Itan Boswellia Highland Perfume Oil");
  });
});

import { describe, expect, it } from "vitest";
import { formatPhone, normalizePhone, normalizePostal, validState } from "@/lib/orders/address-formats";
import { deliveryFromForm } from "@/lib/orders/delivery";

const form = (values: Record<string, string>) => {
  const f = new FormData();
  for (const [k, v] of Object.entries(values)) f.set(k, v);
  return f;
};

describe("phones", () => {
  it("accepts Brazilian mobile and landline numbers, with or without +55", () => {
    expect(normalizePhone("BR", "(11) 99999-9999")).toBe("+5511999999999");
    expect(normalizePhone("BR", "11 3333-4444")).toBe("+551133334444");
    expect(normalizePhone("BR", "+55 21 98765-4321")).toBe("+5521987654321");
    expect(normalizePhone("BR", "99999-9999")).toBeNull();
  });
  it("accepts US numbers with or without the leading 1", () => {
    expect(normalizePhone("US", "(512) 555-1234")).toBe("+15125551234");
    expect(normalizePhone("US", "+1 512 555 1234")).toBe("+15125551234");
    expect(normalizePhone("US", "012 555 1234")).toBeNull();
    expect(normalizePhone("US", "555-1234")).toBeNull();
  });
  it("accepts other countries in international format", () => {
    expect(normalizePhone("OTHER", "+44 20 7946 0958")).toBe("+442079460958");
    expect(normalizePhone("OTHER", "20 7946 0958")).toBeNull();
  });
  it("shows numbers in each country's style", () => {
    expect(formatPhone("+5511999999999")).toBe("+55 11 99999-9999");
    expect(formatPhone("+15125551234")).toBe("+1 (512) 555-1234");
  });
});

describe("postal codes and states", () => {
  it("checks CEP and ZIP formats", () => {
    expect(normalizePostal("BR", "01310100")).toBe("01310-100");
    expect(normalizePostal("BR", "78701")).toBeNull();
    expect(normalizePostal("US", "78701")).toBe("78701");
    expect(normalizePostal("US", "787011234")).toBe("78701-1234");
    expect(normalizePostal("US", "01310-100")).toBeNull();
    expect(normalizePostal("OTHER", "sw1a 1aa")).toBe("SW1A 1AA");
  });
  it("knows Brazilian UFs and US states apart", () => {
    expect(validState("BR", "SP")).toBe(true);
    expect(validState("US", "TX")).toBe(true);
    expect(validState("US", "SP")).toBe(false);
    expect(validState("BR", "TX")).toBe(false);
  });
});

describe("delivery from the order form", () => {
  it("reads a US address without a separate street number", () => {
    const result = deliveryFromForm(
      form({ name: "Jane Doe", phone_country: "US", phone: "512 555 1234", country_code: "US", street: "123 Main St", complement: "Apt 4B", city: "Austin", state: "TX", postal_code: "78701" }),
    );
    expect(result).toEqual({
      delivery: expect.objectContaining({ phone: "+15125551234", country_code: "US", country: "United States", number: "", address: "123 Main St, Apt 4B, Austin, TX 78701, United States" }),
    });
  });
  it("reads a Brazilian address and requires its number", () => {
    const base = { name: "Maria Silva", phone_country: "BR", phone: "11 99999-9999", country_code: "BR", street: "Rua dos Pinheiros", district: "Pinheiros", city: "São Paulo", state: "SP", postal_code: "05422000" };
    expect(deliveryFromForm(form({ ...base, number: "100" }))).toEqual({
      delivery: expect.objectContaining({ postal_code: "05422-000", address: "Rua dos Pinheiros, 100, Pinheiros, São Paulo - SP, 05422-000, Brasil" }),
    });
    expect(deliveryFromForm(form(base))).toEqual({ error: "Preencha rua, número e cidade." });
  });
  it("explains what is wrong", () => {
    expect(deliveryFromForm(form({ name: "Jane Doe", phone_country: "US", phone: "555 1234", country_code: "US" }))).toEqual({ error: "Telefone inválido: informe os 10 dígitos (ex.: 512 555-1234)." });
    expect(deliveryFromForm(form({ name: "Jane Doe", phone_country: "US", phone: "512 555 1234", country_code: "US", street: "1 Main St", city: "Austin", state: "SP", postal_code: "78701" }))).toEqual({ error: "Escolha o estado (state)." });
  });
});

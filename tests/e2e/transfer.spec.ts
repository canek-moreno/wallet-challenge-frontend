import { expect, test, type Page } from "@playwright/test";

async function login(page: Page) {
  await page.goto("/login");
  await page.getByLabel("Correo electrónico o teléfono").fill("mariana.lopez@email.com");
  await page.getByLabel("Contraseña", { exact: true }).fill("demo1234");
  await page.getByRole("button", { name: "Iniciar sesión" }).click();
  await expect(page).toHaveURL("/");
}

test("transfiere a una cuenta propia hasta el comprobante", async ({ page }) => {
  await login(page);
  await page.goto("/transfer");
  await page.getByRole("button", { name: /Cuenta •••• / }).first().click();
  await expect(page).toHaveURL("/transfer/amount");

  for (const digit of ["1", "0", "0", "0", "0"]) {
    await page.getByRole("button", { name: digit, exact: true }).click();
  }
  await page.getByRole("button", { name: "Continuar" }).click();
  await expect(page).toHaveURL("/transfer/review");

  await page.getByRole("button", { name: "Confirmar transferencia" }).click();
  await expect(page).toHaveURL("/transfer/success");
  await expect(page.getByRole("heading", { name: "¡Transferencia enviada!" })).toBeVisible();
});

test("impide continuar cuando el monto supera el saldo", async ({ page }) => {
  await login(page);
  await page.goto("/transfer");
  await page.getByRole("button", { name: /Cuenta •••• / }).first().click();
  for (const digit of ["1", "0", "0", "0", "0", "0", "0", "0", "0"]) {
    await page.getByRole("button", { name: digit, exact: true }).click();
  }
  await expect(page.locator("p[role=alert]")).toHaveText("El monto supera tu saldo disponible.");
  await expect(page.getByRole("button", { name: "Continuar" })).toBeDisabled();
});

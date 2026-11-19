import { expect, test } from "@playwright/test";

test("muestra error con credenciales incorrectas", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Correo o documento").fill("mariana.lopez@email.com");
  await page.getByLabel("Contraseña", { exact: true }).fill("incorrecta");
  await page.getByRole("button", { name: "Iniciar sesión" }).click();
  await expect(page.locator("p[role=alert]")).toHaveText("Correo o contraseña incorrectos.");
});

test("inicia sesión y llega al inicio con el saludo del usuario", async ({ page }) => {
  await page.goto("/login");
  await page.getByLabel("Correo o documento").fill("mariana.lopez@email.com");
  await page.getByLabel("Contraseña", { exact: true }).fill("demo1234");
  await page.getByRole("button", { name: "Iniciar sesión" }).click();
  await expect(page).toHaveURL("/");
  await expect(page.getByRole("heading", { name: "Hola, Mariana" })).toBeVisible();
});

test("protege las rutas autenticadas", async ({ page }) => {
  await page.goto("/transfer");
  await expect(page).toHaveURL(/\/login$/);
});

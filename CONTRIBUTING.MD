# Contribuir al Proyecto

¡Gracias por tu interés en contribuir! Para mantener un desarrollo organizado, sigue estas pautas:

## 📌 Requisitos

- Node.js o Bun instalado.
- Conocer **GitFlow**.
- Seguir el formato de **Conventional Commits**.

## 🛠 Configurar el Entorno

1. **Fork** este repositorio y clónalo en tu máquina.
2. Crea una rama a partir de `develop`:
   ```sh
   git switch -c feature/nueva-funcionalidad develop
   ```
3. Realiza tus cambios y **pruébalos**.
4. Asegúrate de que el código sigue las normas de linting:
   ```sh
   bun run check
   ```
5. Realiza un commit siguiendo **Conventional Commits**:
   ```sh
   git commit -m "feat: agregar nueva funcionalidad"
   ```
6. Sube los cambios y abre un **Pull Request** hacia `develop`.

## 📌 Formato de Commits

Usamos [Conventional Commits](https://www.conventionalcommits.org/) con los siguientes tipos:

- `feat`: Nueva funcionalidad.
- `fix`: Corrección de errores.
- `docs`: Cambios en la documentación.
- `style`: Formateo y estilos (sin cambios en código).
- `refactor`: Reestructuración de código sin cambios en funcionalidad.
- `test`: Agregar o modificar tests.

Ejemplo:
```sh
 git commit -m "fix: corregir error en carga de datos"
```

## 📩 Contacto

Si tienes dudas, abre un **Issue** o contáctame en GitHub.

---

¡Gracias por contribuir! 🚀

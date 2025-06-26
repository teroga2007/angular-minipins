# 📸 Minipins

**Minipins** is a photo browsing app where you can explore, search, and save images of any kind. It allows you to add favorite images, share them on social networks, and write personal notes or thoughts on saved images.

---

## ✨ Features

- 🔍 **Search photos**: Search any topic using the [Unsplash](https://unsplash.com/developers) API.
- ⭐ **Favorites**: Save images to your favorites, with persistent state using `localStorage` and `NgRx Store`.
- ✍️ **Notes**: Write notes and thoughts on your saved images.
- 📤 **Share**: Share images easily on social media.
- 👤 **Profile**: Edit your name, photo, and bio from the profile page.
- 🔐 **Mock login**: Managed entirely with `localStorage`.

---

## 🧪 Tech Stack

- ⚙️ **Angular** (using `standalone components`)
- 🗂️ **NgRx Store** (for managing favorites)
- 💾 **localStorage** (for session, favorites, and profile persistence)
- 🎨 **Tailwind CSS** + [**DaisyUI**](https://daisyui.com/) (with `sunset` theme)
- 🖼️ **Unsplash API** (image search)
- 🧭 **Angular Routing** with **guards** and **lazy loading**
- 🔠 **Bootstrap Icons**
- 🖱️ **Infinite Scroll** (lazy loading for image list)
- 📱 **Responsive design**

---

## 🗂️ Project Structure

```bash
src/
├── app/                  # Root module
├── pages/                # Main views (home, login, detail, profile, etc.)
├── components/           # Reusable components (navbar, toast, cards, etc.)
├── services/             # API services, favorites, auth, toast, etc.
├── models/               # Interfaces and types
├── store/                # Redux store, reducers, actions, selectors
├── utils/                # Utility functions
```

---

## 🚀 Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/minipins.git
   cd minipins
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Run the app:

   ```bash
   ng serve
   ```

4. Open in your browser:

   ```
   http://localhost:4200
   ```

---

## 📸 Credits

- Photos: [Unsplash](https://unsplash.com/)
- Icons: [Bootstrap Icons](https://icons.getbootstrap.com/)
- Styling: [TailwindCSS](https://tailwindcss.com/) + [DaisyUI](https://daisyui.com/)

---

## 🧑‍💻 Author

Stephanie Robles G - [sterogam@gmail.com](mailto:sterogam@gmail.com)

Built as a learning project to apply advanced Angular concepts, global state management, local data persistence, and modern UI.

---

Explore, save, and express yourself with **Minipins**! 🌄✨

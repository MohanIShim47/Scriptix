<p align="center">
  <img src="src/img/icon.png" width="120px">
</p>

<h1 align="center">Scriptix</h1>

<p align="center">
  <b>A modular bookmarklet toolkit for scripts, utilities, and browser tools</b>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/version-v5%20Beta-8a5cff?style=for-the-badge">
  <img src="https://img.shields.io/github/license/MohanIShim47/Scriptix?style=for-the-badge">
  <img src="https://img.shields.io/github/stars/MohanIShim47/Scriptix?style=for-the-badge">
</p>

---

## 🌑 Overview

Scriptix is a **powerful bookmarklet-based UI system** that lets you run scripts, tools, and utilities directly inside your browser.

💡 Think of it as a **mini app launcher overlay for the web**.

## 📸 Screenshots

<p align="center">
  <img src="src/img/scriptix.png" width="100%">
</p>

## ✨ Features

<p align="center">

| 🧩 Modular | 🎛️ Custom UI | ⚡ Fast |
|----------|-------------|--------|
| Load scripts dynamically | Draggable & resizable window | Instant execution |

| 🎮 Scripts | 🛠️ Tools | 💾 Persistent Settings |
|----------|---------|----------------------|
| Game helpers & automation | Dev tools & utilities | Saves preferences locally |

</p>

## 🧠 How to Use

1. Create a new bookmark  
2. Edit the bookmark  
3. Paste the code below into the URL field

---

## 📋 Bookmarklet Code

```js
javascript:(function()%7Bvar script %3D document.createElement("script")%3B%0Ascript.src %3D "https%3A%2F%2Fraw-githack-com.translate.goog%2FMohanIShim47%2FScriptix%2Fmain%2Fsrc%2Fmain.js"%3B%0Adocument.head.appendChild(script)%3B%7D)()
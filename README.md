# Anonymous User Website

**Anonymous User Website** is a privacy-focused authentication system that lets users create accounts and interact on a platform **without revealing any personal information**.  
No email, no phone number, no tracking — just pure anonymity with strong security.

This project demonstrates a modern anonymous login flow using:

- **Login Key** (random identity key)
- **Password authentication**
- **Anonymous device verification** using secure device tokens
- **Security-question fallback** (non-personal)
- **Zero personal data stored**
- **Full anonymity preserved**

The system ensures that even if a login key leaks, attackers cannot access the account without additional verification.

---

## 🚀 Features

### 🔐 Anonymous Account Creation
Users receive:
- A random **Login Key**  
- A secure **Password**  
- Optional non-personal security questions  

No email or phone number is required.

---

### 🕵️ Zero Identity Tracking
The platform stores:
- No email  
- No phone number  
- No IP-based identification  
- No device fingerprinting  

Only hashed tokens and passwords are saved.

---

### 💻 Device Token System
After the first login, each browser gets a **device token** stored in localStorage.

This enables:
- 1-click login on trusted devices  
- Secure verification on new devices  
- No real device data stored  

---

### 🔒 High Security
- Password + Login Key = strong dual security  
- Tokens hashed using bcrypt/argon2  
- CSRF-safe API communication  
- Protection recommendations for XSS in frontend  

---

### 🎨 Modern UI
- Gradient UI  
- Clean typography  
- Responsive design  
- Smooth navbar styling with glass effect  

---

## 🎯 Why This Project Exists

Most websites require personal information to sign up.  
**True anonymity is rare.**

This project provides:
- A template for privacy-preserving apps  
- A secure alternative to normal email-based authentication  
- A foundation for building anonymous platforms (forums, chat apps, etc.)

---

## 🧰 Tech Stack

**Frontend:**  
- HTML  
- CSS Modules  
- JavaScript
- React

**Backend:**  
- Node.js / Express (or replace with your own backend)

**Database:**  
- MongoDB / PostgreSQL (customizable)

---

## 📝 Use Cases
- Anonymous forums  
- Private communities  
- Feedback/confession platforms  
- Polling/voting systems  
- Decentralized/identity-free experiments

---

## 🌍 Project Vision

To enable developers to build platforms where users can express themselves freely, securely, and anonymously — without surrendering personal data.

---

## 📜 License
This project is open-source.  
You may modify and use it for personal or commercial purposes.

---

## ⭐ Contributions
Pull requests and enhancements are welcome!

---

If you'd like, I can also generate:

- **API Documentation**  
- **Folder Structure Explanation**  
- **Setup & Installation Guide**  
- **Screenshots section**  

Just say: **"Generate full README.md with setup instructions."**

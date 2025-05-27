# 🧪 TRUSK FULLSTACK Technical Test - Add Secure Access to Document

## 📚 Business Context

You are working on an admin panel where users can browse document records, and every document is stored in **Amazon S3**.
These documents must **not be publicly accessible**, even if someone gets hold of their raw URLs.

## 🎯 Objective

Build a small application that allows a user to **view a document** (PDF, image, etc.) stored in a **private S3 bucket**, by retrieving a **temporary signed URL**, and **opening it in a new tab**.

---

## 📝 Boilerplate

We provide you with a boilerplate to get you started, it contains:

- A Next.js frontend
- A NestJS backend
- A small snippet of code to use S3

Pre-requisites:

- git
- node / npm

## 🎁 Bonuses

- Refactor / remove the useEffect hook
- Add loading/error "logic"
- Add a test

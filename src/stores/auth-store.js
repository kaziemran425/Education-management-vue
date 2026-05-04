import { defineStore } from "pinia";

export const useAuthStore = defineStore("auth", {
  state: () => ({
    user: JSON.parse(localStorage.getItem("iching_user")) || null,
    token: localStorage.getItem("iching_token") || null,
    role: localStorage.getItem("iching_role") || null,
  }),

  getters: {
    isAuthenticated: (state) => !!state.token,
    currentRole: (state) => state.role,
  },

  actions: {
    // এই ফাংশনটি actions এর ভেতরেই থাকতে হবে
    setAuthData(data) {
      this.token = data.token;
      this.user = data.user;
      this.role = data.role;

      localStorage.setItem("iching_token", data.token);
      localStorage.setItem("iching_role", data.role);
      localStorage.setItem("iching_user", JSON.stringify(data.user));
    },

    async login(email, password) {
      try {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            let role = "";
            let redirect = "";

            // ভ্যালিডেশন লজিক
            if (email === "admin@iching.com") {
              role = "admin";
              redirect = "/admin";
            } else if (
              email === "admin@gmail.com" ||
              email === "tenant@iching.com"
            ) {
              role = "user";
              redirect = "/panel";
            } else {
              return reject(new Error("Invalid credentials"));
            }

            const mockData = {
              token: "mock-jwt-token-12345",
              user: { email, name: role.toUpperCase() },
              role: role,
              redirect: redirect,
            };

            // এখানে 'this' ব্যবহার করে actions কল করা হচ্ছে
            this.setAuthData(mockData);
            resolve(mockData);
          }, 1000);
        });
      } catch (error) {
        throw error;
      }
    },

    logout() {
      this.token = null;
      this.user = null;
      this.role = null;
      localStorage.clear();
    },
  },
});

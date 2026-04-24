import "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name?: string | null;
      email?: string | null;
      image?: string | null;
      role: string;
      paymentStatus: string;
      isActive: boolean;
    };
  }

  interface User {
    id: string;
    role?: string;
    paymentStatus?: string;
    isActive?: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id?: string;
    role?: string;
    paymentStatus?: string;
    isActive?: boolean;
  }
}

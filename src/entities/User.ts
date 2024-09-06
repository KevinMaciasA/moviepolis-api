interface UserParams {
  id?: string;
  name: string;
  email: string;
  passwordHash: string;
  role: 'user' | 'admin';
  createdAt?: Date;
  updatedAt?: Date;
  lastLogin?: Date;
  isActive?: boolean;
  passwordResetToken?: string;
  passwordResetExpires?: Date;
  failedLoginAttempts?: number;
  lockoutUntil?: Date;
  refreshToken?: string;
  refreshTokenExpires?: Date;
  jwtRevokedAt?: Date;
  lastJwtIssue?: Date;
}

class User {
  id: string;  // ULID
  name: string;
  email: string;
  passwordHash: string;  // bcrypt hash
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date | null;
  isActive: boolean;
  passwordResetToken: string | null;
  passwordResetExpires: Date | null;
  failedLoginAttempts: number;
  lockoutUntil: Date | null;
  refreshToken: string | null;
  refreshTokenExpires: Date | null;
  jwtRevokedAt: Date | null;
  lastJwtIssue: Date | null;

  constructor(params: UserParams) {
    this.id = params.id ?? "" // TODO: ULID;
    this.name = params.name;
    this.email = params.email;
    this.passwordHash = params.passwordHash;
    this.role = params.role;
    this.createdAt = params.createdAt ?? new Date();
    this.updatedAt = params.updatedAt ?? new Date();
    this.lastLogin = params.lastLogin ?? new Date();
    this.isActive = params.isActive ?? true;
    this.passwordResetToken = params.passwordResetToken ?? null;
    this.passwordResetExpires = params.passwordResetExpires ?? null;
    this.failedLoginAttempts = params.failedLoginAttempts ?? 0;
    this.lockoutUntil = params.lockoutUntil ?? null;
    this.refreshToken = params.refreshToken ?? null;
    this.refreshTokenExpires = params.refreshTokenExpires ?? null;
    this.jwtRevokedAt = params.jwtRevokedAt ?? null;
    this.lastJwtIssue = params.lastJwtIssue ?? null;
  }

  // Method to update the user details
  updateDetails(details: Partial<Omit<UserParams, 'id' | 'createdAt'>>): void {
    if (details.name) this.name = details.name;
    if (details.email) this.email = details.email;
    if (details.passwordHash) this.passwordHash = details.passwordHash;
    if (details.role) this.role = details.role;
    if (details.lastLogin) this.lastLogin = details.lastLogin;
    if (details.isActive !== undefined) this.isActive = details.isActive;
    if (details.passwordResetToken) this.passwordResetToken = details.passwordResetToken;
    if (details.passwordResetExpires) this.passwordResetExpires = details.passwordResetExpires;
    if (details.failedLoginAttempts !== undefined) this.failedLoginAttempts = details.failedLoginAttempts;
    if (details.lockoutUntil) this.lockoutUntil = details.lockoutUntil;
    if (details.refreshToken) this.refreshToken = details.refreshToken;
    if (details.refreshTokenExpires) this.refreshTokenExpires = details.refreshTokenExpires;
    if (details.jwtRevokedAt) this.jwtRevokedAt = details.jwtRevokedAt;
    if (details.lastJwtIssue) this.lastJwtIssue = details.lastJwtIssue;
    this.updatedAt = new Date();
  }

  login(): void {
    this.lastLogin = new Date();
    this.failedLoginAttempts = 0;
    this.lockoutUntil = null;
    this.updatedAt = new Date();
  }

  failedLoginAttempt(): void {
    const limit = 3
    this.failedLoginAttempts += 1;
    if (this.failedLoginAttempts >= limit) {
      this.lockoutUntil = new Date(new Date().getTime() + 30 * 60 * 1000); // Lockout for 30 minutes
    }
    this.updatedAt = new Date();
  }

  revokeTokens(): void {
    this.jwtRevokedAt = new Date();
    this.updatedAt = new Date();
  }

  getFormattedDate(date: Date | null): string | null {
    return date ? date.toISOString() : null;
  }

  toObject(): Record<string, any> {
    return {
      id: this.id,
      name: this.name,
      email: this.email,
      passwordHash: this.passwordHash,
      role: this.role,
      createdAt: this.getFormattedDate(this.createdAt),
      updatedAt: this.getFormattedDate(this.updatedAt),
      lastLogin: this.getFormattedDate(this.lastLogin),
      isActive: this.isActive,
      passwordResetToken: this.passwordResetToken,
      passwordResetExpires: this.getFormattedDate(this.passwordResetExpires),
      failedLoginAttempts: this.failedLoginAttempts,
      lockoutUntil: this.getFormattedDate(this.lockoutUntil),
      refreshToken: this.refreshToken,
      refreshTokenExpires: this.getFormattedDate(this.refreshTokenExpires),
      jwtRevokedAt: this.getFormattedDate(this.jwtRevokedAt),
      lastJwtIssue: this.getFormattedDate(this.lastJwtIssue),
    };
  }
}

export default User;

import slugify from 'slugify';
import env from '../../config/env.config';
const url = require('url');
import { faker } from '@faker-js/faker';
import * as tokenGen from 'otp-generator';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { CloudStorage } from '../plugins/cloud-storage';
import { Cloudinary } from '../plugins/cloud-storage/cloudinary';
import { User } from '../../modules/users/entities/user.entity';
import { isDev } from '../../environment/isDev';

class SlugifyOptions {
  lower: boolean;
  replacement: string;
}

export class Helper {
  static faker = faker;

  static async hash(string: string) {
    return bcrypt.hash(string, 10);
  }

  static async compare(original: string, existing: string): Promise<boolean> {
    return bcrypt.compare(original, existing);
  }

  static encrypt(text: string) {
    const cipher = crypto.createCipheriv(env.encryption.algorithm, env.encryption.key, env.encryption.iv);
    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');
    return encrypted;
  }

  static decrypt(text: string) {
    const decipher = crypto.createDecipheriv(env.encryption.algorithm, env.encryption.key, env.encryption.iv);
    let decrypted = decipher.update(text, 'hex', 'utf8');
    decrypted += decipher.final('utf8');
    return decrypted;
  }

  static slugify(name: string, options?: SlugifyOptions) {
    if (options) {
      return slugify(name, options);
    }
    return slugify(name, { lower: true, replacement: '_' });
  }

  static generatePatientId(companyName: string) {
    const companyInitials = this.getInitials(companyName, 3);
    const patientId = `${companyInitials}-${Helper.generateToken(6)}`;
    return patientId;
  }

  /** 
    @param letters number of letters
    @param numbers number of numbers
    @param either number of either letters or numbers
  */
  static randString(letters: number, numbers: number, either: number) {
    const chars = [
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
      '0123456789',
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
    ];

    return [letters, numbers, either]
      .map((len, i) => {
        return Array(len)
          .fill(chars[i])
          .map((x) => {
            return x[Math.floor(Math.random() * x.length)];
          })
          .join('');
      })
      .concat()
      .join('')
      .split('')
      .sort(() => {
        return 0.5 - Math.random();
      })
      .join('');
  }

  static getScheme() {
    const dbUrl = url.parse(env.dbUrl);
    const scheme = dbUrl.protocol.substr(0, dbUrl.protocol.length - 1);
    return scheme;
  }

  static generateToken(length = 6, options: Record<string, any> = {}) {
    if (isDev()) {
      return '123456';
    }
    return tokenGen.generate(length, {
      digits: true,
      upperCaseAlphabets: false,
      specialChars: false,
      lowerCaseAlphabets: false,
      ...options,
    });
  }

  static numberWithCommas(x: number | string): string {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  static cleanQuery(value: string) {
    if (!value) {
      return null;
    }
    if (value === '') {
      return null;
    }
    return value;
  }

  static shuffleArray<T>(array: T[]): T[] {
    const shuffled = array.sort(() => Math.random() - 0.5);
    return shuffled;
  }

  static isEmail(text: string): boolean {
    const regexExp =
      /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

    return regexExp.test(text);
  }

  static moneyFormat(amount: number, currency = 'NGN'): string {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      currencyDisplay: 'symbol',
    }).format(amount);
  }

  static getCurrencySymbol(currency: string): string {
    const currencies = {
      NGN: '₦',
      USD: '$',
      GBP: '£',
      EUR: '€',
    };
    return currencies[currency];
  }

  static async cloudinaryUpload(file: Express.Multer.File, options?: Record<string, unknown>) {
    const storage = new CloudStorage(new Cloudinary());
    const { path } = file;
    const fileUrl = await storage.uploadFile(path, undefined, options);
    return fileUrl;
  }

  static getInitials(name: string, length = 2): string {
    const names = name.split(' ');
    const initials = names.map((n) => n[0]);
    return initials.join('').substr(0, length);
  }

  static formatPermissions(user: User) {
    const permissions = user.role.permissions.reduce((acc, permission) => {
      const { permissionGroup } = permission;
      if (!acc[permissionGroup.name]) {
        acc[permissionGroup.name] = [];
      }
      delete permission.permissionGroup;
      acc[permissionGroup.name].push(permission);
      return acc;
    }, {});
    delete user.role.permissions;
    const userWithPermissions = { ...user.toJSON(), permissions };
    return userWithPermissions;
  }

  static convertSnakeToSentence(snakeCase: string): string {
    return snakeCase
      .split('_')
      .map((word) => {
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join(' ');
  }
}

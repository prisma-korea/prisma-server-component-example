/**
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 *
 */

/**
 * @typedef { import("@prisma/client").PrismaClient } PrismaClient
 */
import {PrismaClient} from 'react-prisma';

/**
 * @type {PrismaClient}
 */
export const prisma = new PrismaClient();
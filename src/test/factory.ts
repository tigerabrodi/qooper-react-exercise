import { faker } from '@faker-js/faker'

export function createFakeUser() {
  return {
    username: faker.internet.userName(),
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
  }
}

export function createFakeTask() {
  return {
    content: faker.lorem.sentence(),
  }
}

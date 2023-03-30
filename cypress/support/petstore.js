export const BASE_URL = Cypress.config().baseUrl;

export const createPet = (pet) => {
  return cy.request({
    method: "POST",
    url: `${BASE_URL}/pet`,
    body: {
      id: 0,
      category: {
        id: 0,
        name: "string",
      },
      name: pet.name,
      photoUrls: ["string"],
      tags: [
        {
          id: 0,
          name: "string",
        },
      ],
      status: pet.status,
    },
  });
};

export const getPetById = (id) => {
  return cy.request({
    method: "GET",
    url: `${BASE_URL}/pet/${id}`,
  });
};

export const updatePet = (pet) => {
  return cy.request({
    method: "PUT",
    url: `${BASE_URL}/pet`,
    body: pet /* {
      id: pet.id,
      category: {
        id: 0,
        name: "string",
      },
      name: pet.name,
      photoUrls: ["string"],
      tags: [
        {
          id: 0,
          name: "string",
        },
      ],
      status: pet.status,
    }, */
  });
};

export const deletePet = (id) => {
  return cy.request({
    method: "DELETE",
    url: `${BASE_URL}/pet/${id}`,
  });
};

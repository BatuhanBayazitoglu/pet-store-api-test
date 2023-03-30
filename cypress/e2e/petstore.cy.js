import {
  createPet,
  deletePet,
  getPetById,
  updatePet,
} from "../support/petstore";

describe("Pet Store API tests", () => {
  let petId;

  beforeEach(() => {
    // Create a pet before running the tests
    const petData = { name: "BonBon10", status: "available" };
    createPet(petData).then((response) => {
      petId = response.body.id;
      cy.log(petId);
    });
  });

  afterEach(() => {
    // Delete the pet after running the tests
    // TODO: API fails to delete the pet, fails with NumberFormatException error for the id it returns
    // deletePet(petId);
  });

  it("should create a new pet", () => {
    const petData = { name: "Buddy", status: "available" };
    createPet(petData).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.name).to.equal(petData.name);
      expect(response.body.status).to.equal(petData.status);
    });
  });

  // TODO: API is not returning 405 as documented on invalid input
  /* it("should not create a new pet with invalid input", () => {
    const petData = { id: "not-an-id", status: "invalid" };
    createPet(petData).then((response) => {
      expect(response.status).to.equal(405);
    });
  }); */

  // TODO: API returns 500
  /* it("should update an existing pet", () => {
    const petData = {
      id: petId,
      name: "BonBon10",
      status: "sold",
    };
    updatePet(petData).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.name).to.equal(petData.name);
      expect(response.body.status).to.equal(petData.status);
    });
  }); */

  it("should not update an existing pet with invalid id", () => {
    const petData = {
      id: "1234245",
      name: "BonBon10",
      status: "sold",
    };
    updatePet(petData).then((response) => {
      expect(response.status).to.equal(400);
    });
  });

  it("should not update an existing pet with invalid pet name", () => {
    const petData = {
      id: petId,
      name: "nopet",
      status: "sold",
    };
    updatePet(petData).then((response) => {
      expect(response.status).to.equal(404);
    });
  });

  it("should not update an existing pet if data is missing", () => {
    const petData = {
      id: petId,
      status: "sold",
    };
    updatePet(petData).then((response) => {
      expect(response.status).to.equal(405);
    });
  });

  it("should retrieve an existing pet", () => {
    getPetById(petId).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.id).to.equal(petId);
    });
  });

  it("should not retrieve an existing pet with invalid pet id", () => {
    getPetById("4325325").then((response) => {
      expect(response.status).to.equal(400);
    });
  });

  it("should delete an existing pet", () => {
    deletePet(petId).then((response) => {
      expect(response.status).to.equal(200);
      expect(response.body.message).to.equal(petId.toString());
    });
  });

  it("should return a 404 error for a non-existent pet", () => {
    getPetById(-1).then((response) => {
      expect(response.status).to.equal(404);
      expect(response.body.message).to.equal("Pet not found");
    });
  });
});

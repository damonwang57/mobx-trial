
import { makeObservable, observable, computed, action, autorun, runInAction } from "mobx";

class PetOwnerStore {
    pets = [];
    owners = [];

    constructor () {
        makeObservable(this, {
            pets: observable,
            owners: observable,
            totalOwners: computed,
            totalPets: computed,
            storeDetails: computed,
            getPetsByOwner: action,
            createPet: action,
            createOwner: action,
            updatePet: action,
            updateOwner: action,
            deletePet: action,
            deleteOwner: action,
            assignOwnerToPet: action,
        });
        autorun(this.logStoreDetails);
        // A reaction that runs just once!
        runInAction(this.prefetchData);
    }

    // total number owners
    get totalOwners() {
        return this.owners.length;
    }

    // total number of pets
    get totalPets() {
        return this.pets.length;
    }

    // Get pets using ownerId
    getPetsByOwner(ownerId) {
        return this.pets.filter((pet) => {
            return pet.owner && pet.owner.id === ownerId;
        });
    }

    createPet(pet = { id: 0, name: "", type: "", breed: "", owner: null }) {
        this.pets.push(pet);
    }

    createOwner(owner = { id: 0, firstName: "", lastName: "" }) {
        this.owners.push(owner);
    }

    updateOwner(ownerId, update) {
        const ownerIndexAtId = this.owners.findIndex((pet) => pet.id === ownerId);
        if (ownerIndexAtId > -1 && update) {
            this.owners[ownerIndexAtId] = update;
        }
    }

    updatePet(petId, update) {
        const petIndexAtId = this.pets.findIndex((pet) => pet.id === petId);
        if (petIndexAtId > -1 && update) {
            this.pets[petIndexAtId] = update;
        }
    }

    deletePet(petId) {
        const petIndexAtId = this.pets.findIndex((pet) => pet.id === petId);
        if (petIndexAtId > -1) {
            this.pets.splice(petIndexAtId, 1)
        }
    }

    deleteOwner(ownerId) {
        const ownerIndexAtId = this.owners.findIndex((owner) => owner.id === ownerId);
        if (ownerIndexAtId > -1) {
            this.owners.splice(ownerIndexAtId, 1)
        }
    }

    // assign an owner using ownerId to a pet using petId
    assignOwnerToPet(ownerId, petId) {
        const petIndexAtId = this.pets.findIndex((pet) => pet.id === petId);
        const ownerIndexAtId = this.owners.findIndex((pet) => pet.id === ownerId);
        if (petIndexAtId > -1 && ownerIndexAtId > -1) {
            this.pets[petIndexAtId].owner = this.owners[petIndexAtId];
        }
    }

    get storeDetails() {
        return `We have ${this.totalPets} total pets and ${this.totalOwners} total owners, so far!!!`;
    }

    // Log the store details to the console
    logStoreDetails() {
        console.log(this.storeDetails);
    }

    prefetchData = () => {
        const owners = [{ firstName: "Aleem", lastName: "Isiaka", id: 1 }];
        const pets = [
          {
            id: 1,
            name: "Lincy",
            breed: "Siamese",
            type: "Cat",
            ownerId: 1,
          },
        ];
    
        setTimeout(() => {
          console.log("Fetch complete update store");
          owners.map((pet) => this.createOwner(pet));
          pets.map((pet) => {
            this.createPet(pet);
            this.assignOwnerToPet(pet.ownerId, pet.id);
            return pet;
          });
        }, 3000);
      };
}


// const petOwnerStore = new PetOwnerStore();

//   petOwnerStore.createPet({
//     id: 1,
//     name: "Bingo",
//     type: "Dog",
//     breed: "alsertian",
//   });
//   petOwnerStore.createPet({
//     id: 2,
//     name: "Lloyd",
//     type: "Cat",
//     breed: "winky",
//   });
//   petOwnerStore.createOwner({ id: 1, firstName: "Aleem", lastName: "Isiaka" });



export default PetOwnerStore;

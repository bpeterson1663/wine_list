import VARIETALS from '../constants/Varietal.list'

export default class Varietal {
  image: string
  varietal: string
  constructor(varietal: string) {
    this.varietal = varietal
    this.image = this.setImage(varietal)
  }

  setImage(varietal: string): string {
    const grape = VARIETALS.find((grape) => grape.varietal === varietal)
    return grape
      ? grape.image
      : 'https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Vi%C3%B1edoCafayate.jpg/1200px-Vi%C3%B1edoCafayate.jpg'
  }
}

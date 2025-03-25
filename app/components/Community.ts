export class Community {
  id: number | undefined;
  name: string = "";
  description: string = "";
  imageUrl: string = "";
  county: string = "";
  isVisited: boolean = false;

  get isNew(): boolean {
    return this.id === undefined;
  }

  constructor(initializer?: Partial<Community>) {
    if (!initializer) return;
    if (initializer.id) this.id = initializer.id;
    if (initializer.name) this.name = initializer.name;
    if (initializer.description) this.description = initializer.description;
    if (initializer.imageUrl) this.imageUrl = initializer.imageUrl;
    if (initializer.county) this.county = initializer.county;
    if (initializer.isVisited) this.isVisited = initializer.isVisited;
  }
}

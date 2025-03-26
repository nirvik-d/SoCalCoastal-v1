export class Community {
  id: number | undefined;
  name: string = "";
  description: string = "";
  image_url: string = "";
  county: string = "";
  is_visited: boolean = false;

  get isNew(): boolean {
    return this.id === undefined;
  }

  constructor(initializer?: Partial<Community>) {
    if (!initializer) return;
    if (initializer.id) this.id = initializer.id;
    if (initializer.name) this.name = initializer.name;
    if (initializer.description) this.description = initializer.description;
    if (initializer.image_url) this.image_url = initializer.image_url;
    if (initializer.county) this.county = initializer.county;
    if (initializer.is_visited) this.is_visited = initializer.is_visited;
  }
}

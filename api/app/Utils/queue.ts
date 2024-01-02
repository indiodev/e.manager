type Item<T> = Record<number, T>

export class Queue<T> {
  constructor(
    private count: number = 0,
    private lowestCount: number = 0,
    private items: Item<T> = {}
  ) {}

  public enqueue(element: T): void {
    this.items[this.count] = element
    this.count++
  }

  public dequeue(): T | undefined {
    if (this.isEmpty()) return undefined
    const front = this.items[this.lowestCount]
    delete this.items[this.lowestCount]
    this.lowestCount++
    return front
  }

  public peek(): T | undefined {
    if (this.isEmpty()) return undefined

    return this.items[this.lowestCount]
  }

  public clear(): void {
    while (!this.isEmpty()) {
      this.dequeue()
    }
  }

  public isEmpty(): boolean {
    return this.size() === 0
  }

  public size(): number {
    return this.count - this.lowestCount
  }

  public toString(): string {
    if (this.isEmpty()) return ''

    return Object.values(this.items).join()
  }
}

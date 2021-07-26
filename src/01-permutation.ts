function remove<T>(set: Set<T>, i: T) {
  const newSet = new Set<T>([...set])
  newSet.delete(i)
  return newSet
}

function permutation(str: string) {
  function R(set: Set<string>): Array<string> {
    if (set.size === 1) {
      return [set.values().next().value]
    }

    return flattern(
      [...set].map((c) => R(remove(set, c)).map((perm) => c + perm))
    )
  }

  return R(new Set([...str]))
}

function flattern(arr: any[]): any[] {
  console.log('arr', arr)
  if (!Array.isArray(arr)) {
    return arr
  }
  return ([] as any[]).concat(...arr.map(flattern))
}

console.log(permutation('abc'))

const fi = (function () {
  return {
    libraryMethod: function () {
      return 'Start by reading https://medium.com/javascript-scene/master-the-javascript-interview-what-is-functional-programming-7f218c68b3a0'
    },

    each: (collection, callback) => {
      if (Array.isArray(collection)) {
        for (let i = 0; i < collection.length; i++) {
          callback(collection[i], i, collection)
        }
      } else {
        for (const key in collection) {
          callback(collection[key], key, collection)
        }
      }
      return collection
    },

    map: (collection, callback) => {
      const mapped = []
      if (Array.isArray(collection)) {
        for (let i = 0; i < collection.length; i++) {
          const value = callback(collection[i], i, collection)
          if (value !== undefined) {
            mapped[i] = value
          }
        }
        for (let i = 0; i < collection.length; i++) {
          if (typeof collection[i] === 'undefined') {
            collection.splice(i, 1)
          }
        }
      } else {
        for (const key in collection) {
          mapped.push(callback(collection[key], key, collection))
        }
      }
      return mapped
    },

    reduce: (collection, callback, accumulator) => {
      for (const element of collection) {
        if (typeof accumulator === 'undefined') {
          accumulator = collection[0]
        } else {
          accumulator = callback(accumulator, element, collection)
        }
      }
      return accumulator
    },

    find: (collection, predicate) => {
      for (const element of collection) {
        if (predicate(element)) {
          return element
        }
      }
    },

    filter: (collection, predicate) => {
      const array = fi.map(collection, (element, index, collection) => {
        if (predicate(element)) {
          return element
        }
      })
      for (let i = 0; i < array.length; i++) {
        if (typeof array[i] === 'undefined') {
          array.splice(i, 1)
        }
      }
      return array
    },

    size: (collection) => {
      if (Array.isArray(collection)) {
        return collection.length
      } else {
        let count = 0
        for (const element of Object.values(collection)) {
          count += 1
        }
        return count
      }
    },

    first: (array, n) => {
      if (typeof n === 'undefined') {
        return array[0]
      } else {
        return array.slice(0, n)
      }
    },

    last: (array, n) => {
      if (typeof n === 'undefined') {
        return array.slice(-1)[0]
      } else {
        const num = Math.abs(n) * -1
        return array.slice(num)
      }
    },

    compact: (array) => {
      const newArray = []
      for (let i = 0; i < array.length; i++) {
        if (array[i]) {
          newArray.push(array[i])
        }
      }
      return newArray
    },

    sortBy: (array, callback) => {
      const newArray = [...array]
      let allSorted = false
      const swap = (a, b) => {
        let temp
        if (callback(a) > callback(b)) {
          temp = b
          b = a
          a = temp
        }
        return [a, b]
      }
      const recurse = () => {
        for (let i = 0; i < newArray.length; i++) {
          if (i < newArray.length - 1) {
            const current = swap(newArray[i], newArray[i + 1])
            newArray[i] = current[0]
            newArray[i + 1] = current[1]
          }
        }
        for (let j = 0; j < newArray.length; j++) {
          if (allSorted) {
            break
          }
          if (callback(newArray[j]) > callback(newArray[j + 1])) {
            recurse()
          } else if (
            j === newArray.length - 1 &&
            callback(newArray[j]) > callback(newArray[j - 1])
          ) {
            allSorted = true
          }
        }
      }
      recurse()
      return newArray
    },

    flatten: (array, shallow, newArray = []) => {
      if (shallow) {
        for (const element of array) {
          if (Array.isArray(element)) {
            newArray.push(...element)
          } else {
            newArray.push(element)
          }
        }
      } else {
        for (const element of array) {
          if (Array.isArray(element)) {
            fi.flatten(element, false, newArray)
          } else {
            newArray.push(element)
          }
        }
      }
      return newArray
    },

    uniq: (array, isSorted, callback) => {
      let newArray = [...array]
      let uniqueArray = []
      let newUniqueArray = []
      let allUnique = false
      const recurse = () => {
        for (let i = 0; i < newArray.length; i++) {
          if (i < newArray.length - 1) {
            if (typeof callback === 'function') {
              if (callback(newArray[i]) === callback(newArray[i + 1])) {
                newArray.splice(i, 1)
              }
            } else {
              if (newArray[i] === newArray[i + 1]) {
                newArray.splice(i, 1)
              }
            }
          }
        }
        for (let j = 0; j < newArray.length; j++) {
          if (allUnique) {
            break
          }
          if (typeof callback === 'function') {
            if (callback(newArray[j]) === callback(newArray[j + 1])) {
              recurse()
            } else if (
              j === newArray.length - 1 &&
              callback(newArray[j]) === callback(newArray[j - 1])
            ) {
              allUnique = true
            }
          } else {
            if (newArray[j] === newArray[j + 1]) {
              recurse()
            } else if (
              j === newArray.length - 1 &&
              newArray[j] === newArray[j - 1]
            ) {
              allUnique = true
            }
          }
        }
      }
      if (isSorted) {
        recurse()
        return newArray
      } else {
        for (const element of array) {
          if (typeof callback === 'function') {
            if (!uniqueArray.includes(callback(element))) {
              uniqueArray.push(callback(element))
              newUniqueArray.push(element)
            }
          } else {
            if (!uniqueArray.includes(element)) {
              uniqueArray.push(element)
              newUniqueArray.push(element)
            }
          }
        }
        return newUniqueArray
      }
    },

    keys: (object) => {
      return fi.map(Object.entries(object), (entry) => entry[0])
    },

    values: (object) => {
      return fi.map(Object.entries(object), (entry) => entry[1])
    },

    functions: (object) => {
      let functions = Object.entries(object).map((element) => {
        if (typeof element[1] === 'function') {
          return element[0]
        } else {
          return
        }
      })
      functions = functions.filter((value) => value !== undefined)
      return functions.sort()
    }
  }
})()

fi.libraryMethod()

const array = [1, [2], [[3]]]
console.log(array)
console.log(fi.flatten(array, false))

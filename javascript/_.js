/* Recreating the Lodash Library */

const _ = {
    /**
     * 
     * @param {number} num - the input number
     * @param {number} lower - the lower bound
     * @param {number} upper - the upper bound
     * 
     * @returns {number} `num` if `num` is within given bounds.
     *                  otherwise the closer extreme 
     */ 
    clamp(num, lower, upper){
      let higherClampedValue = Math.min(num, upper)
      return Math.max(higherClampedValue, lower)
    },
    
    /**
     * 
     * @param {number} num - a positive input number
     * @param {number} [start=0] - the start value, default 0
     * @param {number} end - the end value
     * 
     * @returns {boolean} true, if `start` <= `num` < `end`; false, otherwise
     */
    inRange(num, start, end){
      if (!end){
        end = start
        start = 0
      }
      if (start > end){
        let tmp = start
        start = end
        end = tmp
      }
      return (num >= start) && (num < end)
    },
    
    /**
     * 
     * @param {string} string - the input string
     * 
     * @returns {Array} - an array of words in `string` 
     */
    words(string){
      let words = string.split(' ')
      return words
    },

   /**
    * 
    * @param {string} string - the input string 
    * @param {number} length - the required length
    * 
    * @returns {string} a string padded with spaces padded equally on both ends
    * of the `string` so that length of this new string is equal to `length`,
    * if the number of spaces required is an odd number,
    * the extra space is added to the back of the given string
    */
    pad(string, length){
      let newString = ""
      newString = Object.assign(newString, string)
      let present = newString.length
      let deficit = length - present
      if (deficit <= 0){
        return newString
      }
      else{
        let padding = Math.floor(deficit / 2)
        if (deficit % 2 !== 0){
          newString = newString + ' '
        }
        for (let i = 0; i < padding; i++){
          newString = ' ' + newString
          newString = newString + ' '
        }
      }
      return newString
    },
    
    /**
     * 
     * @param {object} obj - the input object 
     * @param {any} key - the input key
     * 
     * @returns {boolean} false, if value of `obj`.`key` is undefined;
     * true, otherwise
     */
    has(obj, key){
      if (!obj[key]){
        return false
      }
      return true
    },
    
    /**
     * 
     * @param {object} obj - the input object 
     * 
     * @returns {object} a new object with key:value pairs of `obj` reversed
     */
    invert(obj){
      let newObj = {}
      for (let key in obj){
        newObj[obj[key]] = key
      }
      return newObj
    },
  
    /**
     * 
     * @param {object} obj - the input object
     * @param {Function} func - the test predicate function
     * 
     * @returns {any} the first key whose value in the input object
     * returns a truthy value when passed to the predicated function i.e.,
     * the first key for which func(obj[key]) === truthy
     */
    findKey(obj, func){
      for (let key in obj){
        if (func(obj[key])){
          return key
        }
      }
    },
    
    /**
     * 
     * @param {Array} arr - the input array
     * @param {number} [num=1] - the input array
     * 
     * @returns {Array} a new array with `num` number of elements
     * removed from `arr`
     */
    drop(arr, num){
      let newArr = ""
      newArr = Object.assign(newArr, arr)
      if (!num){
        num = 1
      }
      for (let i = 0; i < num; i++){
        newArr.shift()
      }
      return newArr
    },
    
    /**
     * 
     * @param {Array} arr - the input array 
     * @param {Function} func - the test predicate function (array_element, index, array)  
     * 
     * @returns {Array} a new array formed by dropping an element
     * from the beginning of `arr`
     * while `func`(`arr`[index], index, `arr`) is true 
     */
    dropWhile(arr, func){
      let newArr = []
      let start
      for (let i = 0; func(arr[i], i, arr); i++){
        start = i + 1
      }
      for (let i = start; i < arr.length; i++){
        newArr[i - start] = arr[i] 
      }
      return newArr
    },
    

    /**
     * 
     * @param {Array} arr - the input array
     * @param {number} [size=1] - the input size
     * 
     * @returns {Array} a new array of arrays each of which is formed by
     * breaking down `arr` into chunks of `size` elements in order;
     * if not perfectly divisible, 
     * the last chunk may have less than `size' elements
     */
    chunk(arr, size){
      let arrChunks = []
      let { length } = arr
      if (!size){
        size = 1
      }
      if (length <= size){
        return arr
      }
      else {
        let chunks = []
        for (let i = 0; i < arr.length; i += size){
          chunk = arr.slice(i, i + size)
          arrChunks.push(chunk)
        }
      }
      return arrChunks
    }
  
  }

  // Do not write or modify code below this line.
  module.exports = _;
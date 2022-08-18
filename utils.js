/** Utility function to shuffle the elements in an array */
export const shuffler = (newElement, array) => {
    let randomIndex = Math.floor(Math.random() * (array.length + 1)) - 1;
    array.splice(randomIndex, 0, newElement);
    return array;
  };

/** Function to that takes an index and returns a color in hexadecimal string*/
export const colorPicker = (index) => {
    let colors = ['#EF476F', '#118AB2', '#FFD166', '#07B084'];
    return colors[index];
}
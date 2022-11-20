import { list } from "../data/list";

export const initialState = { selectedIndex: 0 };

export const reducer = (state: any, action: any) => {
  const scroll = (index: any) => {
    if (index >= 0 && index < list.length)
      action.scrollElement.children[index].scrollIntoView();
  };
  switch (action.type) {
    case "arrowUp":
      const index =
        state.selectedIndex > 0 ? state.selectedIndex - 1 : list.length - 1;     
      scroll(index); // To hande scrollIntoView
      return {
        selectedIndex: index,  
      };
    case "arrowDown": {
      let index =
        state.selectedIndex !== list.length - 1 ? state.selectedIndex + 1 : 0;
      scroll(index); // To hande scrollIntoView
      return {
        selectedIndex: index,
      };
    }
    case "select":
      return { selectedIndex: action.payload };
    default:
      throw new Error();
  }
};

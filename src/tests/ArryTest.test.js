import { render, fireEvent, screen } from "@testing-library/react";
 
 import Arry from "../../src/components/Arry";
 //test block
test("increments counter", () => {
// render the component on virtual dom
render(<Arry />);
  
//select the elements you want to interact with
//  const ascBtn = screen.getByTestId("btn-asc");
// let val=[2,4,5,6,7,8,11,13];
// //interact with those elements
// fireEvent.click(ascBtn);
// const arry = shallowEqual(<Arry />);
// //assert the expected result
// expect(arry.state.nums).toBe(val)
});
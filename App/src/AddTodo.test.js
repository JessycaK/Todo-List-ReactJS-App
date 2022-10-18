import { render, screen, fireEvent} from '@testing-library/react';
import { unmountComponentAtNode } from 'react-dom';
import App from './App';

let container = null;
beforeEach(() => {
  // setup a DOM element as a render target
  container = document.createElement("div");
  document.body.appendChild(container);
});

afterEach(() => {
  // cleanup on exiting
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});


test('test that we have an Add button', () => {
  render(<App/>);
  const element = screen.getByRole('button', {name: /Add/i});
  expect(element).toBeInTheDocument();
});

test('test that there is an input field for task names', () => {
  render(<App/>);
  const element = screen.getByRole('textbox', {name: /Add New Item/i});
  expect(element).toBeInTheDocument();
});

test('test that there is an input field for due dates', () => {
  render(<App/>);
  const element = screen.getByPlaceholderText("mm/dd/yyyy");
  expect(element).toBeInTheDocument();
});

test('test for no tasks text', () => {
  render(<App/>);
  const check = screen.getByText(/You have no todo's left/i)
  expect(check).toBeInTheDocument();
});


test('test that App component renders Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i})
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy")
  const element = screen.getByRole('button', {name: /Add/i}) ;
  fireEvent.change(inputTask, { target: { value: "History Test"}})
  fireEvent.change(inputDate, { target: { value: "05/30/2023"}})
  fireEvent.click(element)
  const check = screen.getByText(/History Test/i)
  expect(check).toBeInTheDocument();
 });


 test('test that App component doesn\'t render dupicate Task', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i})
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy")
  const element = screen.getByRole('button', {name: /Add/i}) ;
  fireEvent.change(inputTask, { target: { value: "History Test"}})
  fireEvent.change(inputDate, { target: { value: "05/30/2023"}})
  fireEvent.click(element)
  fireEvent.change(inputTask, { target: { value: "History Test"}})
  fireEvent.change(inputDate, { target: { value: "05/30/2024"}})
  fireEvent.click(element)
  const check = screen.getAllByText(/Test/i)
  expect(check.length).toBe(1);
 });

 test('test that App component doesn\'t add a blank task', () => {
  render(<App />);
  const element = screen.getByRole('button', {name: /Add/i}) ;
  fireEvent.click(element)
  const check = screen.getByText(/You have no todo's left/i)
  expect(check).toBeInTheDocument();
 });
 
 test('test that App component doesn\'t add a task without task name', () => {
  render(<App />);
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy")
  const element = screen.getByRole('button', {name: /Add/i}) ;
  fireEvent.change(inputDate, { target: { value: "05/30/2023"}})
  fireEvent.click(element)
  const check = screen.getByText(/You have no todo's left/i)
  expect(check).toBeInTheDocument();
 });

 test('test that App component doesn\'t add a task without due date', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i})
  const element = screen.getByRole('button', {name: /Add/i}) ;
  fireEvent.change(inputTask, { target: { value: "History Test"}})
  fireEvent.click(element)
  const check = screen.getByText(/You have no todo's left/i)
  expect(check).toBeInTheDocument();
 });



 test('test that App component can be deleted thru checkbox', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i})
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy")
  const element = screen.getByRole('button', {name: /Add/i}) ;
  fireEvent.change(inputTask, { target: { value: "History Test"}})
  fireEvent.change(inputDate, { target: { value: "05/30/2023"}})
  fireEvent.click(element)
  const checkTask = screen.getByRole('checkbox')
  fireEvent.click(checkTask)
  const check = screen.getByText(/You have no todo's left/i)
  expect(check).toBeInTheDocument();
 });


 test('test that App component renders different colors for past due events', () => {
  render(<App />);
  const inputTask = screen.getByRole('textbox', {name: /Add New Item/i})
  const inputDate = screen.getByPlaceholderText("mm/dd/yyyy")
  const element = screen.getByRole('button', {name: /Add/i}) ;
  fireEvent.change(inputTask, { target: { value: "History Test"}})
  fireEvent.change(inputDate, { target: { value: "05/30/2023"}})
  fireEvent.click(element)
  fireEvent.change(inputTask, { target: { value: "Math Test"}})
  fireEvent.change(inputDate, { target: { value: "05/30/2021"}})
  fireEvent.click(element)
  const historyCheck = screen.getByTestId(/History Test/i).style.background
  const mathCheck = screen.getByTestId(/Math Test/i).style.background

  expect(mathCheck == historyCheck).toBe(false);
 });

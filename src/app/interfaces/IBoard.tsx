export default interface IBoard {
  title?: string;
  board_key?: string;
  author?: string;
  create_time?: string | null;
  modified_time?: string;
  menu_sub_key: string;
  content?: string;
}

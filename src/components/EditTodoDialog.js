import { Dialog, DialogContent, DialogTitle, Divider } from "@mui/material";
import { useCallback, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TodoService } from "../services/todoService";
import "../css/EditTodoDialog.css";

const EditTodoDialog = ({ dialog, handleCloseBtn }) => {
  const [todoData, setTodoData] = useState({
    updatedName: dialog?.todo?.name,
    updatedDesc: dialog?.todo?.description,
  });

  const dispatch = useDispatch();

  const updating = useSelector((state) => state.todo.updating);

  const handleInputChange = useCallback((e) => {
    e.preventDefault();
    setTodoData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  }, []);

  const handleCloseDialog = useCallback(() => {
    setTodoData({ updatedDesc: "", updatedName: "" });
    handleCloseBtn();
  }, [handleCloseBtn]);

  const handleUpdateTodoBtn = useCallback(() => {
    dispatch(
      TodoService.UpdateTodo({
        _id: dialog?.todo?._id,
        name: todoData?.updatedName,
        description: todoData?.updatedDesc,
      })
    );
    handleCloseDialog();
  }, [
    dialog?.todo?._id,
    dispatch,
    handleCloseDialog,
    todoData?.updatedDesc,
    todoData?.updatedName,
  ]);

  return (
    <Dialog
      sx={{ width: "100vw" }}
      open={dialog.open}
      onClose={handleCloseDialog}
    >
      <DialogTitle
        className="custom-dialog-header"
        sx={{ display: "flex", justifyContent: "space-between" }}
      >
        Edit Todo
      </DialogTitle>

      <Divider />
      <DialogContent>
        <p> {dialog?.todo?.name}</p>
        <div className="d-flex flex-column mt-2">
          <label htmlFor="newName">Edit Todo Name :</label>
          <input
            style={{ width: "300px" }}
            className="form-control form-control-md"
            type="text"
            name="updatedName"
            value={todoData.updatedName}
            onChange={handleInputChange}
          />
        </div>
        <div className="d-flex flex-column mt-2">
          <label htmlFor="newName">Edit Description Name :</label>
          <input
            style={{ width: "300px" }}
            className="form-control form-control-md"
            type="text"
            name="updatedDesc"
            value={todoData.updatedDesc}
            onChange={handleInputChange}
          />
        </div>
        <button
          type="button"
          className={"btn btn-sm btn-danger mt-3 float-left"}
          onClick={handleCloseDialog}
          disabled={updating}
        >
          Cancel
        </button>
        <button
          type="button"
          style={{ float: "right" }}
          className={"btn btn-sm btn-primary mt-3"}
          onClick={handleUpdateTodoBtn}
          disabled={
            !todoData?.updatedName || !todoData?.updatedDesc || updating
          }
        >
          {updating ? <i className="fa fa-spin fa-spinner" /> : "Edit"}
        </button>
      </DialogContent>
    </Dialog>
  );
};

export default EditTodoDialog;

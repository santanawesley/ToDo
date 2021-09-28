import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { filteredList } from "../../redux/actions";

const Search = (props) => {
  const { filteredList, initialList } = props;

  const search = (e) => {
    const TypedName = e.target.value;
    const searchedList =
      Array.isArray(initialList.value) &&
      initialList.value.filter((task) => {
        return task.name.indexOf(TypedName) !== -1;
      });
    filteredList(searchedList);
  };

  return (
    <div>
      Pesquisar
      <input type="text" onChange={search} />
    </div>
  );
};

const mapStateToProps = (store) => ({
  initialList: store.initialList,
  filteredList: store.filteredList,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators({ filteredList }, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Search);

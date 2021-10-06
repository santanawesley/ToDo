import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import {
  filterCall,
  searchFilteredList,
} from "../../redux/actions";
import "./styles.css";

const Search = (props) => {
  const {
    dateFilteredList,
    filterCall,
    initialList,
    readyFilterCall,
    searchFilteredList,
  } = props;
  const [nameSearch, setNameSearch] = useState("");

  const search = (e) => {
    setNameSearch(e.target.value);
  };

  useEffect(() => {
    filterCall("search");
    const searchedList = initialList.value.filter((task) => {
      return task.name.indexOf(nameSearch) !== -1;
    });
    searchFilteredList(searchedList);
  }, [nameSearch]);

  useEffect(() => {
    if (readyFilterCall.value === "date") {
      const searchedList = dateFilteredList.value.filter((task) => {
        return task.name.indexOf(nameSearch) !== -1;
      });
      searchFilteredList(searchedList);
    }
  }, [dateFilteredList]);

  const clearSearch = () => {
    const inputSearch = document.getElementById("input-search");
    setNameSearch("");
    return (inputSearch.value = "");
  };

  return (
    <div>
      Pesquisar <input type="text" onChange={search} id="input-search" />
      <section className="tooltip">
        <span onClick={clearSearch} className="clear">
          X
        </span>
        <span className="tooltip-text">Limpar pesquisa</span>
      </section>
    </div>
  );
};

const mapStateToProps = (store) => ({
  initialList: store.initialList,
  dateFilteredList: store.dateFilteredList,
  readyFilterCall: store.filterCall,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { filterCall, searchFilteredList },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Search);

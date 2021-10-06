import React, { useEffect, useState } from "react";
import { addDays, isWithinInterval } from "date-fns";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { TextField, Button } from "@material-ui/core";

import {
  dateFilteredList,
  filterCall,
} from "../../redux/actions";

import "./styles.css";

const FilterData = (props) => {
  const {
    readInitialList,
    dateFilteredList,
    filterCall,
    readyFilterCall,
    searchFilteredList,
  } = props;
  const [initialData, setInitialData] = useState([]);
  const [selectedDate, setSelectedDate] = useState({
    initialDate: "",
    endDate: "",
  });

  useEffect(() => {
    setInitialData(readInitialList);
  }, [readInitialList]);

  useEffect(() => {
    if (readyFilterCall.value === "search") {
      if (selectedDate.initialDate && selectedDate.endDate) {
        const changedData = searchFilteredList.value.filter((plan) => {
          return isWithinInterval(new Date(plan.inserted_at), {
            start: new Date(selectedDate.initialDate),
            end: addDays(new Date(selectedDate.endDate), 1),
          });
        });
        dateFilteredList(changedData);
      }
    }
  }, [searchFilteredList]);

  const handleDateChange = (date, type) => {
    if (type === "initial") {
      setSelectedDate({ ...selectedDate, initialDate: date });
    }
    if (type === "end") {
      setSelectedDate({ ...selectedDate, endDate: date });
    }
  };

  const selectedDates = () => {
    if (selectedDate.initialDate && selectedDate.endDate) return false;
    return true;
  };

  const filterByDate = () => {
    if (initialData) {
      filterCall("date");
      const changedData = initialData.value.filter((plan) => {
        return isWithinInterval(new Date(plan.inserted_at), {
          start: new Date(selectedDate.initialDate),
          end: addDays(new Date(selectedDate.endDate), 1),
        });
      });
      dateFilteredList(changedData);
    }
  };

  const cleanFilter = () => {
    setSelectedDate({ initialDate: "", endDate: "" });
    dateFilteredList(initialData.value);
  };

  return (
    <div className="filter">
      <form className="container" noValidate>
        <TextField
          id="dateInitial"
          label="De:"
          InputProps={{
            inputProps: {
              max: selectedDate.endDate,
              style: { textTransform: "uppercase" },
            },
          }}
          type="date"
          value={selectedDate.initialDate}
          className="textField"
          onChange={(e) => handleDateChange(e.target.value, "initial")}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
      <form className="container" noValidate>
        <TextField
          id="dateEnd"
          label="Até:"
          InputProps={{
            inputProps: {
              min: selectedDate.initialDate,
              style: { textTransform: "uppercase" },
            },
          }}
          type="date"
          value={selectedDate.endDate}
          className="textField"
          onChange={(e) => handleDateChange(e.target.value, "end")}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </form>
      <div className="buttons">
        <Button
          variant="contained"
          className="buttonAdd"
          disabled={selectedDates()}
          onClick={filterByDate}
        >
          Filtrar
        </Button>
        <Button
          variant="contained"
          className="buttonAdd"
          disabled={selectedDates()}
          onClick={cleanFilter}
        >
          Limpar filtro
        </Button>
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { dateFilteredList, filterCall },
    dispatch
  );

const mapStateToProps = (store) => ({
  readInitialList: store.initialList,
  searchFilteredList: store.searchFilteredList,
  readyFilterCall: store.filterCall,
});

export default connect(mapStateToProps, mapDispatchToProps)(FilterData);

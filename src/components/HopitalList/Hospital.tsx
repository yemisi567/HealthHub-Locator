import { ColumnDef } from "@tanstack/react-table";
import Table from "../Table/Table";
import styles from "./Hospital.module.scss";
import Select from "../Select/Select";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import {
  CheckPrimaryColorIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
} from "../utils/Icons";
import { useState } from "react";
import cn from "classnames";
import { HospitalNavigation } from "./Navigation";
import EmptyState from "../EmptyState/EmptyState";

interface HospitalResponse {
  name: string;
  address: string;
  img: string;
  services: string;
}
type Options = {
  label: React.ReactNode;
  value: string;
};
const data = [
  {
    name: "General Hospital",
    address: "123 Main St",
    img: "",
    services: "treatment ",
  },
  {
    name: "General Hospital",
    address: "123 Main St",
    img: "",
    services: "treatment ",
  },
  {
    name: "General Hospital",
    address: "123 Main St",
    img: "",
    services: "treatment ",
  },
];

const columns: ColumnDef<HospitalResponse>[] = [
  {
    accessorKey: "name",
    header: "Hospital Name",
    cell: ({ row }) => row.original.name || "--",
  },
  {
    accessorKey: "address",
    header: "Address",
    cell: ({ row }) => row.original.address || "--",
  },
  {
    accessorKey: "img",
    header: "",
    cell: ({ row }) => row.original.img || "--",
  },
  {
    accessorKey: "services",
    header: "Services",
    cell: ({ row }) => row.original.services || "--",
  },
];

const states = ["Lagos"];
const cities = [];

export default function HopsitalList() {
  const [selectedState, setSelectedState] = useState("");
  const [selectedCity, setSelectedCity] = useState("");
  const [loading, setLoading] = useState(false);
  const currentPage = 0;
  const pageNumber = 0;
  const totalPages = 4;

  const stateTypesForSelect: Options[] = [
    ...states.map((item) => ({
      value: item,
      label: (
        <>
          {item}
          <CheckPrimaryColorIcon />
        </>
      ),
    })),
  ];

  const citiesTypesForSelect: Options[] = [
    ...cities.map((item) => ({
      value: item,
      label: (
        <>
          {item}
          <CheckPrimaryColorIcon />
        </>
      ),
    })),
  ];

  const handleCityChange = () => {};
  const handleStateChange = () => {};

  return (
   
    <div>
      <HospitalNavigation />
      <div className={styles.wrapper}>
        <div className={styles.header_text}>
          Search for an hospital by state and city.
        </div>
        <div className={styles.header}>
          <div className={cn("filters", styles.hospital_filters)}>
            <div>
              <Select
                label={!selectedState ? "State" : selectedState}
                placeholder="State"
                options={stateTypesForSelect}
                defaultValue={selectedState}
                wrapperClass="select"
                classNames={{
                  control: () => "control",
                  valueContainer: () => "valuescontainer",
                  option: (state) =>
                    state.isSelected
                      ? cn(
                          styles.statustype_option,
                          styles.statustype_option_selected
                        )
                      : styles.statustype_option,
                  singleValue: () => styles.statustype_value,
                }}
                onChange={handleStateChange}
              />
            </div>

            <div>
              <Select
                label={!selectedCity ? "City" : selectedCity}
                placeholder="City"
                options={citiesTypesForSelect}
                defaultValue={selectedCity}
                wrapperClass="select"
                classNames={{
                  control: () => "control control_border",
                  valueContainer: () => "valuescontainer",
                  option: (state) =>
                    state.isSelected
                      ? cn(
                          styles.statustype_option,
                          styles.statustype_option_selected
                        )
                      : styles.statustype_option,
                  singleValue: () => styles.statustype_value,
                }}
                onChange={handleCityChange}
              />
            </div>
          </div>
        </div>
        <div className={styles.button_wrapper}>
          <button className="btn-custom">Export to Csv</button>
        </div>
        {/* {loading && (
          <div style={{ marginTop: 20 }}>
            <Skeleton
              count={8}
              style={{ height: "2.1rem", marginBottom: "1rem" }}
            />
          </div>
        )} */}
        {!loading && (
          <div style={{ marginTop: 20 }}>
            <Table data={data} columns={columns} />
          </div>
        )}
        {data.length === 0 && <EmptyState />}
        <div className={cn(styles.fixed_pagination, styles.pg, "fs-exclude")}>
          <div className={styles.pg_right}>
            <button
              className={cn(
                styles.nav_button,
                styles.pg_navbtn,
                styles.pg_prevbtn,
                {
                  [styles.pg_prevbtn_addmargin]: totalPages < 3,
                }
              )}
              type="button"
              disabled={currentPage === 1}
              // onClick={handleGoToPrevPage}
            >
              <ChevronLeftIcon />
              prev
            </button>
            {totalPages >= 3 && (
              <div className={styles.pg_pagebtns}>
                <button
                  key={pageNumber}
                  className={cn(styles.nav_button, styles.pg_pagebtn, {
                    [styles.pg_pageactive]: pageNumber === currentPage,
                  })}
                  type="button"
                  // onClick={() =>
                  //     handleGoToPage(Number(pageNumber))
                  // }
                >
                  30
                </button>
              </div>
            )}
            <button
              className={cn(
                styles.nav_button,
                styles.pg_navbtn,
                styles.pg_nextbtn
              )}
              type="button"
              // onClick={handleGoToNextPage}
              disabled={currentPage === totalPages}
            >
              next
              <ChevronRightIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

import React, { useEffect } from "react";
import { ColumnDef, Row } from "@tanstack/react-table";
import Table from "../Table/Table";
import styles from "./Hospital.module.scss";
import Select from "../Select/Select";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { CheckPrimaryColorIcon } from "../utils/Icons";
import { useState } from "react";
import cn from "classnames";
import { HospitalNavigation } from "./Navigation";
import EmptyState from "../EmptyState/EmptyState";
import { WhatsappShareButton, WhatsappIcon } from "react-share";
import {
  addNewHospital,
  generateFilteredHospitals,
  getStoredHospitals,
  states,
  statesAndCitiesNigeria,
} from "../data/faker";
import { HospitalResponse } from "../utils/type";
import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { saveAs } from "file-saver";
import * as XLSX from "xlsx";
import Modal from "../Modal/Modal";
import Input from "../Input/Input";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { AddTextEditor } from "../TextEditor/TextEditor";
import { storage } from "../../../firebase";
import { ViewEditorText } from "../TextEditor/ViewEditorText/ViewEditorText";

type Options = {
  label: React.ReactNode;
  value: string;
};

export default function HopsitalList() {
  const [selectedState, setSelectedState] = useState("Lagos");
  const [selectedCity, setSelectedCity] = useState("Lekki");
  const [hospitals, setHospitals] = useState<HospitalResponse[]>(
    {} as HospitalResponse[]
  );
  const [uploading, setUploading] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [additonalInformation, setAdditionalInformation] = React.useState("");
  const [showModal, setShowModal] = useState(false);
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const shareUrl = window.location.href;
  const [loading, setLoading] = useState(false);
  const [addedNewHospital, setAddedNewHospital] = useState(false);
  const [newHospitalResponse, setNewHospitalResponse] = useState<
    HospitalResponse[]
  >({} as HospitalResponse[]);
  const cities = selectedState
    ? (statesAndCitiesNigeria[selectedState as never] as string[])
    : [];

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

  const columns: ColumnDef<HospitalResponse>[] = [
    {
      accessorKey: "avatar",
      header: "",
      cell: ({ row }) => (
        <div>
          {
            <img
              src={row.original.avatar || "--"}
              alt="Hospital image"
              width={100}
              height={100}
            />
          }
        </div>
      ),
    },
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
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => row.original.email || "--",
    },
    {
      accessorKey: "contact",
      header: "Contact",
      cell: ({ row }) => row.original.contact || "--",
    },

    {
      accessorKey: "emergency",
      header: "Emergency Services",
      cell: ({ row }) =>
        row.original.emergencyServices === true ? "True" : "False" || "--",
    },
    {
      accessorKey: "additionalInfo",
      header: "Additional Information",
      cell: ({ row }) => <ViewEditorText text={row.original.more as string} />,
    },
    {
      accessorKey: "more",
      header: "",
      cell: ({ row }) => (
        <div style={{ marginRight: 50 }}>
          <WhatsappShareButton
            url={shareUrl}
            title={`Check out ${row.original.name}'s hospital details`}
          >
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
        </div>
      ),
    },
  ];

  useEffect(() => {
    setLoading(true);
    if (selectedState && selectedCity) {
      const allHospitals = generateFilteredHospitals(
        selectedState,
        selectedCity
      );
      if (newHospitalResponse.length > 0) {
        setHospitals([...newHospitalResponse, ...allHospitals]);
      } else {
        setHospitals(allHospitals);
      }
    }
    setLoading(false);
  }, [selectedState, selectedCity, addedNewHospital]);

  const handleSetTableRowStyle = (row: Row<HospitalResponse>) => {
    switch (row.original.emergencyServices) {
      case true:
        return {
          background:
            "linear-gradient(246deg, rgba(199, 250, 167, 0.43) -2.89%, rgba(199, 250, 167, 0.35) 36.64%, rgba(199, 250, 167, 0.20) 73.18%, rgba(199, 250, 167, 0.00) 101.31%)",
        };
      case false:
        return {
          background:
            "linear-gradient(246deg, rgba(252, 198, 234, 0.47) -2.89%, rgba(252, 198, 234, 0.35) 36.64%, rgba(252, 180, 228, 0.20) 73.18%, rgba(252, 180, 228, 0.00) 101.31%)",
        };
      default:
        return {
          background:
            "linear-gradient(246deg, rgba(252, 198, 234, 0.47) -2.89%, rgba(252, 198, 234, 0.35) 36.64%, rgba(252, 180, 228, 0.20) 73.18%, rgba(252, 180, 228, 0.00) 101.31%)",
        };
    }
  };

  const exportToExcel = (excelData: unknown[], fileName: string) => {
    const fileType =
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8";
    const fileExtension = ".xlsx";

    // Convert data to worksheet
    const ws = XLSX.utils.json_to_sheet(excelData);

    // Convert worksheet to workbook
    const wb = { Sheets: { data: ws }, SheetNames: ["data"] };
    const excelBuffer = XLSX.write(wb, { bookType: "xlsx", type: "array" });
    const data = new Blob([excelBuffer], { type: fileType });
    saveAs(data, fileName + fileExtension);
  };

  const schema = yup.object({
    name: yup.string().required("Name is required"),
    contact: yup.string().required("Contact is required"),
    address: yup.string().required("Address is required"),
    city: yup.string().required("City is required"),
    state: yup.string().required("State is required"),
    email: yup.string().required("Location is required"),
  });

  const handleImageUpload = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setUploading(true);
    const file = event.target.files?.[0];
    if (!file) return;
    const storageRef = ref(storage, `files/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = Math.round(
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        );
        setProgressPercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setSelectedImage(downloadURL);
          setUploading(false);
        });
      }
    );
  };

  // React hook form values
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<HospitalResponse>({
    resolver: yupResolver(schema),
    mode: "onChange",
  });

  const onSubmit = (data: HospitalResponse) => {
    addNewHospital({
      ...data,
      more: additonalInformation,
      avatar: selectedImage,
    });
    const response = getStoredHospitals();
    setAddedNewHospital(true);
    setNewHospitalResponse(response);

    setShowModal(false);
  };

  return (
    <div>
      {showModal && (
        <Modal
          header="Add a new hospital"
          centered
          onCloseButton={() => setShowModal(false)}
          onCancelClick={() => setShowModal(false)}
          showFooter
          okText="Add"
          cancelText="Cancel"
          submitBtnFormValue="add-hospital"
        >
          <div>
            <form
              id="add-hospital"
              name="add-hospital"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div style={{ marginBottom: 10 }}>
                <Input
                  {...register("name")}
                  label="Hospital Name"
                  placeholder="Enter hospital name"
                  hasError={!!errors.name}
                  errorText={errors.name?.message}
                  isRequired
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <Input
                  {...register("state")}
                  label="Enter state"
                  placeholder="Enter state"
                  hasError={!!errors.state}
                  errorText={errors.state?.message}
                  isRequired
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <Input
                  {...register("city")}
                  label="Enter city"
                  placeholder="Enter city"
                  hasError={!!errors.city}
                  errorText={errors.city?.message}
                  isRequired
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <Input
                  {...register("email")}
                  label="Enter email"
                  placeholder="Enter email"
                  hasError={!!errors.email}
                  errorText={errors.email?.message}
                  isRequired
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <Input
                  {...register("contact")}
                  label="Enter contact"
                  placeholder="Enter contact"
                  hasError={!!errors.contact}
                  errorText={errors.contact?.message}
                  isRequired
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <Input
                  {...register("address")}
                  label="Enter address"
                  placeholder="Enter address"
                  hasError={!!errors.address}
                  errorText={errors.address?.message}
                  isRequired
                />
              </div>
              <div style={{ marginBottom: 10 }}>
                <AddTextEditor
                  title="Additional Information"
                  onEditorTextChange={setAdditionalInformation}
                />
              </div>
              <div style={{ marginTop: 20 }}>
                <Input
                  id="image"
                  name="image"
                  type="file"
                  placeholder="Upload hospital image"
                  onChange={handleImageUpload}
                />
                <div style={{ width: "100%" }}>
                  {uploading && (
                    <div
                      style={{
                        width: `${progressPercent}%`,
                        backgroundColor: "green",
                        marginTop: "-1.5rem",
                        fontSize: "1.6rem",
                      }}
                    >
                      Uploading percentage:{" "}
                      <span style={{ fontWeight: "600" }}>
                        {progressPercent}%
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </form>
          </div>
        </Modal>
      )}
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
                defaultValue={stateTypesForSelect.find(
                  (state) => state.value === selectedState
                )}
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
                onChange={(value) => setSelectedState((value as Options).value)}
              />
            </div>
            <div>
              <Select
                label={!selectedCity ? "City" : selectedCity}
                placeholder="City"
                options={citiesTypesForSelect}
                defaultValue={citiesTypesForSelect.find(
                  (city) => city.value === selectedCity
                )}
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
                onChange={(value) => setSelectedCity((value as Options).value)}
              />
            </div>
          </div>
        </div>
        <div className={styles.button_wrapper}>
          <button className="btn-custom" onClick={() => setShowModal(true)}>
            Add Hospital
          </button>
          <button
            className={cn(styles.add_csv, "btn-custom")}
            onClick={() => exportToExcel(hospitals, "hospitals.xlsx")}
          >
            Export to Csv
          </button>
        </div>
        {loading && (
          <div style={{ marginTop: 20 }}>
            <Skeleton
              count={8}
              style={{ height: "2.1rem", marginBottom: "1rem" }}
            />
          </div>
        )}
        {!loading && (
          <div style={{ marginTop: 20 }}>
            <Table
              data={hospitals}
              columns={columns}
              handleRowStyle={handleSetTableRowStyle}
            />
          </div>
        )}
        {hospitals?.length === 0 && <EmptyState />}
      </div>
    </div>
  );
}

import {
  Data,
  DataSearch,
  DataTable,
  Toolbar,
  Text,
  Box,
  Image,
  Menu,
  DataFilters,
} from "grommet";
import data from "../data.geo.json";
import { FC, useState } from "react";
import { Filter } from "grommet-icons";

const RecordImage: FC<Pick<GeoRecord, "placeType">> = ({ placeType }) => {
  const url =
    placeType === "CPM"
      ? "https://placehold.co/600x400"
      : "https://placehold.co/600x400";

  return (
    <Box height="small" width="small" round="full" overflow="hidden">
      <Image fit="cover" src={url} />
    </Box>
  );
};

const columns = [
  {
    property: "NRO",
    header: <Text>NRO</Text>,
    primary: true,
    render: (datum) => <Text>{datum.NRO}</Text>,
    search: false,
  },
  {
    property: "TIPO",
    header: "TIPO",
    render: (datum) => <RecordImage placeType={datum.TIPO} />,
    search: false,
  },
  {
    property: "DOMICILIO",
    header: "Dirección",
    render: (datum) => <Text>{datum.DOMICILIO}</Text>,
  },
  {
    property: "PROVEEDOR",
    header: "PROVEEDOR",
    render: (datum) => <Text>{datum.PROVEEDOR}</Text>,
    search: false,
  },
  {
    property: "LINK",
    header: "LINK",
    render: (datum) => <Text>el link</Text>,
    search: false,
  },
  {
    property: "ZONA",
    header: "ZONA",
    render: (datum) => <Text>{datum.ZONA}</Text>,
    search: false,
  },
  {
    property: "COMUNA",
    header: "COMUNA",
    render: (datum) => <Text>{datum.COMUNA}</Text>,
    search: false,
  },
  {
    property: "CLAVE",
    header: "CLAVE",
    render: (datum) => <Text>{datum.CLAVE}</Text>,
    search: false,
  },
];

const FilterC: FC<{ onFilterChange: (filter: string) => void }> = ({
  onFilterChange,
}) => {
  return (
    <Menu
      label="Filtro"
      icon={<Filter />}
      items={[
        { label: "Todos", onClick: () => onFilterChange("") },
        { label: "Rivadavia", onClick: () => onFilterChange("rivadavia") },
        { label: "Gaona", onClick: () => onFilterChange("gaona") },
      ]}
    />
  );
};

function Records() {
  const [filter, setFilter] = useState("");

  const filteredData = data.features
    .map((r) => r.properties)
    .filter((record) => {
      if (!filter) return true;
      return record.DOMICILIO.toLowerCase().includes(filter.toLowerCase());
    });

  return (
    <Data data={filteredData}>
      <Toolbar>
        <DataSearch />
        <DataFilters />
        <FilterC onFilterChange={setFilter} />
      </Toolbar>
      <DataTable columns={columns} sortable={true} fill="horizontal" />
    </Data>
  );
}

export default Records;

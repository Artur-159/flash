import { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Tab, Tabs } from "@mui/material";
import TableHeader from "../../components/table/table-header";
import FriendsList from "./components/list";
import FriendRequests from "./components/friend-requests";
import Search from "../../components/search";
import AddToFriendModal from "./components/add-to-friend-modal";
import { handleError } from "../../utils/handle-error";

import styles from "./styles.module.scss";

const CustomTabPanel = ({ children, value, index }) => {
  return <div hidden={value !== index}>{value === index && children}</div>;
};

const Friends = () => {
  const [value, setValue] = useState(0);

  const {
    control,

    handleSubmit,
  } = useForm({
    defaultValues: {
      search: "",
    },
  });

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const onSearch = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      handleError(error);
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.header}>
        <h1 className={styles.title}>Իմ ընկերները</h1>
        <AddToFriendModal />
      </div>
      <Box
        sx={{
          width: "100%",
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
        }}
      >
        <Tabs
          value={value}
          textColor="secondary"
          onChange={handleChange}
          indicatorColor="secondary"
          aria-label="secondary tabs example"
        >
          <Tab label="Բոլորը" />
          <Tab label="Հարցումներ" />
        </Tabs>
        <Search
          name="search"
          control={control}
          className={styles.search_friend}
          onSearch={handleSubmit(onSearch)}
        />
      </Box>

      <TableHeader
        columns={[
          "Անուն",
          "էլ. փոստ",
          `${value === 1 ? "Ամսաթիվ" : "Ստեղծման ամսաթիվ"}`,
          "Գործողություններ",
        ]}
      />
      <CustomTabPanel value={value} index={0}>
        <FriendsList />
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        <FriendRequests />
      </CustomTabPanel>
    </div>
  );
};

export default Friends;

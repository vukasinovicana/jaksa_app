import { Tabs } from "@chakra-ui/react";
import "./css/RequestsSent.css";
import RequestsSection from "../components/RequestsSection";
import { User } from "../types/User";

interface RequestSentProps {
  user?: User;
}

const RequestsSent = ({ user }: RequestSentProps) => {
  return (
    <div className="tabs-container">
      <Tabs.Root defaultValue="na-cekanju">
        <Tabs.List className="tabs-list-sent">
          <Tabs.Trigger
            className="tabs-trigger-sent"
            value="na-cekanju"
            _selected={{
              color: "#3D2B1F",
            }}
          >
            Na čekanju
          </Tabs.Trigger>
          <Tabs.Trigger
            className="tabs-trigger-sent"
            value="odobreni"
            _selected={{
              color: "#3D2B1F",
            }}
          >
            Odobreni
          </Tabs.Trigger>
          <Tabs.Trigger
            className="tabs-trigger-sent"
            value="odbijeni"
            _selected={{
              color: "#3D2B1F",
            }}
          >
            Odbijeni
          </Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="na-cekanju">
          <RequestsSection user={user} status={"PENDING"} />
        </Tabs.Content>
        <Tabs.Content value="odobreni">
          <RequestsSection user={user} status={"APPROVED"} />
        </Tabs.Content>
        <Tabs.Content value="odbijeni">
          <RequestsSection user={user} status={"REJECTED"} />
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};

export default RequestsSent;

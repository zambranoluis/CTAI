import { useState, useEffect } from "react";
import { Button } from "@nextui-org/button";
import { Switch } from "@nextui-org/switch";
import {
  Modal,
  ModalHeader,
  ModalContent,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { useSession } from "next-auth/react";
import { MdNotificationAdd } from "react-icons/md";
import {
  toggleNotification,
  getNotificationStatus,
} from "@/services/notificacionReportService";
import Swal from "sweetalert2";

const ActivateNotifications = ({ reportType, loading }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const { data: session } = useSession();
  const [smsActive, setSmsActive] = useState(false);
  const [emailActive, setEmailActive] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (!session?.user?.id || !reportType || !session?.accessToken) return;

    const fetchStatus = async () => {
      try {
        const status = await getNotificationStatus(
          session.user.id,
          reportType,
          session.accessToken,
        );
        if (status) {
          setSmsActive(status.notifyTypes.includes("SMS"));
          setEmailActive(status.notifyTypes.includes("EMAIL"));
        }
      } catch (error) {
        if (error?.response?.status === 404) return;
        console.error("Error fetching notification status:", error);
      }
    };

    fetchStatus();
  }, [session, reportType]);

  const handleToggle = async () => {
    if (!session?.user?.id || !reportType || !session?.accessToken) {
      alert("User session, report type, or token not found!");
      return;
    }

    setSaving(true);
    try {
      // Construye el array de tipos de notificación activados
      const notifyTypes = [];
      if (smsActive) notifyTypes.push("SMS");
      if (emailActive) notifyTypes.push("EMAIL");

      await toggleNotification(
        session.user.id,
        reportType,
        notifyTypes,
        true,
        session.accessToken,
      );

      Swal.fire({
        icon: "success",
        title: "Success",
        text: "Notification settings saved successfully.",
      });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Failed to save notification settings. Please try again.",
      });
    } finally {
      setSaving(false);
      onOpenChange(false); // Close modal
    }
  };

  return (
    <div>
      <Button isLoading={loading} className='' onPress={onOpen}>
        <MdNotificationAdd className='text-2xl' />
      </Button>
      <Modal
        className='place-self-start top-[170px]'
        size='sm'
        isOpen={isOpen}
        onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader>Notification Settings</ModalHeader>
              <ModalBody>
                <div className='flex justify-between items-center'>
                  <p className='w-[60%]'>Activate SMS Alerts</p>
                  <Switch
                    isSelected={smsActive}
                    onValueChange={(isSelected) => setSmsActive(isSelected)}
                  />
                </div>
                <div className='flex justify-between items-center'>
                  <p className='w-[60%]'>Activate Email Alerts</p>
                  <Switch
                    isSelected={emailActive}
                    onValueChange={(isSelected) => setEmailActive(isSelected)}
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button isDisabled={saving} isLoading={saving} onPress={handleToggle}>
                  Save Settings
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default ActivateNotifications;

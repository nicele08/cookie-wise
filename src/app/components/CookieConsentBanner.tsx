"use client";

import React, { useEffect, useState } from "react";
import {
  Button,
  Card,
  CardBody,
  Switch,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import { useCookies } from "next-client-cookies";
import { motion, AnimatePresence } from "framer-motion";
import { env } from "@/lib/env";

type CookiePreferences = {
  necessary: boolean;
  functional: boolean;
  analytics: boolean;
  marketing: boolean;
};

const DEFAULT_PREFERENCES: CookiePreferences = {
  necessary: true,
  functional: false,
  analytics: false,
  marketing: false,
};

const COOKIE_DESCRIPTIONS = {
  necessary:
    "Essential cookies that ensure the website functions properly and maintain your security.",
  functional:
    "Cookies that remember your preferences and customize your experience.",
  analytics: "Cookies that help us understand how you use our website.",
  marketing: "Cookies used to deliver personalized advertisements.",
};

export default function CookieConsentBanner() {
  const cookies = useCookies();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isVisible, setIsVisible] = useState(false);
  const [preferences, setPreferences] =
    useState<CookiePreferences>(DEFAULT_PREFERENCES);

  // Load the user's preferences from a cookie when the component mounts
  useEffect(() => {
    const savedPreferences = cookies.get(
      env.NEXT_PUBLIC_COOKIE_PREFERENCES_KEY
    );
    if (!savedPreferences) {
      setIsVisible(true);
    } else {
      try {
        setPreferences(JSON.parse(savedPreferences));
      } catch (e) {
        const error = e as Error;
        console.error(`Failed to parse cookie preferences: ${error.message}`);
        setIsVisible(true);
      }
    }
  }, [cookies]);

  // Save the user's preferences to a cookie and close the modal
  const savePreferences = (newPreferences: CookiePreferences) => {
    const thirtyDays = 30 * 24 * 60 * 60 * 1000;
    cookies.set(
      env.NEXT_PUBLIC_COOKIE_PREFERENCES_KEY,
      JSON.stringify(newPreferences),
      {
        expires: new Date(Date.now() + thirtyDays),
        path: "/",
        sameSite: "strict",
        secure: env.NODE_ENV === "production",
      }
    );
    setPreferences(newPreferences);
    setIsVisible(false);
    onClose();
  };

  const handleAcceptAll = () => {
    savePreferences({
      necessary: true,
      functional: true,
      analytics: true,
      marketing: true,
    });
  };

  const handleSaveSettings = () => {
    savePreferences(preferences);
  };

  const handleAcceptNecessary = () => {
    savePreferences(DEFAULT_PREFERENCES);
  };

  const togglePreference = (key: keyof CookiePreferences) => {
    if (key === "necessary") return;
    setPreferences((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  if (!isVisible && !isOpen) return null;

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6"
          >
            <Card className="max-w-7xl mx-auto">
              <CardBody className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-lg font-semibold mb-2">
                    We value your privacy
                  </h2>
                  <p className="text-sm text-gray-600">
                    We use cookies to enhance your browsing experience and
                    analyze our traffic. Please choose your cookie preferences.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-2 min-w-fit">
                  <Button variant="bordered" onPress={onOpen}>
                    Cookie Settings
                  </Button>
                  <Button variant="bordered" onPress={handleAcceptNecessary}>
                    Accept Necessary
                  </Button>
                  <Button color="primary" onPress={handleAcceptAll}>
                    Accept All
                  </Button>
                </div>
              </CardBody>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        scrollBehavior="inside"
        size="lg"
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Cookie Preferences
                <p className="text-sm text-gray-500 font-normal">
                  Customize your cookie preferences. Necessary cookies cannot be
                  disabled as they are essential for the website to function
                  properly.
                </p>
              </ModalHeader>
              <ModalBody>
                <div className="space-y-6">
                  {(
                    Object.keys(preferences) as Array<keyof CookiePreferences>
                  ).map((key) => (
                    <div
                      key={key}
                      className="flex items-center justify-between space-x-4"
                    >
                      <div className="flex-1">
                        <p className="text-sm font-medium">
                          {key.charAt(0).toUpperCase() + key.slice(1)} Cookies
                        </p>
                        <p className="text-sm text-gray-500">
                          {COOKIE_DESCRIPTIONS[key]}
                        </p>
                      </div>
                      <Switch
                        isSelected={preferences[key]}
                        onValueChange={() => togglePreference(key)}
                        isDisabled={key === "necessary"}
                        aria-label={`Toggle ${key} cookies`}
                      />
                    </div>
                  ))}
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="bordered" onPress={onClose}>
                  Cancel
                </Button>
                <Button color="primary" onPress={handleSaveSettings}>
                  Save Preferences
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}

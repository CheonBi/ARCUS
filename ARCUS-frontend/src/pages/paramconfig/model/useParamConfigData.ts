import { INITIAL_INPUT_FIELDS, INITIAL_RADIO_GROUPS, INITIAL_SWITCH_ITEMS } from "@entities/paramconfig";
import { useState } from "react";

const cloneInputFields = () => INITIAL_INPUT_FIELDS.map((field) => ({ ...field }));
const cloneRadioGroups = () =>
  INITIAL_RADIO_GROUPS.map((group) => ({
    ...group,
    options: [...group.options],
  }));
const cloneSwitchItems = () => INITIAL_SWITCH_ITEMS.map((item) => ({ ...item }));

export const useParamConfigData = () => {
  const [inputFields, setInputFields] = useState(() => cloneInputFields());
  const [radioGroups, setRadioGroups] = useState(() => cloneRadioGroups());
  const [switchItems, setSwitchItems] = useState(() => cloneSwitchItems());
  const [canEdit, setCanEdit] = useState(false);
  const [isWarningOpen, setIsWarningOpen] = useState(false); //Warning Dialog Close Handling

  const decoratedInputFields = inputFields.map((field, index) => ({
    ...field,
    isDirty: field.value !== INITIAL_INPUT_FIELDS[index]?.value,
  }));

  const decoratedRadioGroups = radioGroups.map((group, index) => ({
    ...group,
    isDirty: group.selectedKey !== INITIAL_RADIO_GROUPS[index]?.selectedKey,
  }));

  const decoratedSwitchItems = switchItems.map((item, index) => ({
    ...item,
    isDirty: item.enabled !== INITIAL_SWITCH_ITEMS[index]?.enabled,
  }));

  const dirtyCount =
    decoratedInputFields.filter((field) => field.isDirty).length +
    decoratedRadioGroups.filter((group) => group.isDirty).length +
    decoratedSwitchItems.filter((item) => item.isDirty).length;

  const handleFieldChange = (fieldKey: string, nextValue: string) => {
    setInputFields((current) =>
      current.map((field) => (field.key === fieldKey ? { ...field, value: nextValue } : field)),
    );
  };

  const handleRadioChange = (groupKey: string, optionKey: string) => {
    setRadioGroups((current) =>
      current.map((group) => (group.key === groupKey ? { ...group, selectedKey: optionKey } : group)),
    );
  };

  const handleSwitchChange = (itemKey: string) => {
    setSwitchItems((current) =>
      current.map((item) => (item.key === itemKey ? { ...item, enabled: !item.enabled } : item)),
    );
  };

  const handleWarningOpen = () => {
    setIsWarningOpen(true);
  };

  const handleWarningClose = () => {
    setIsWarningOpen(false);
  };

  const handleWarningConfirm = () => {
    setCanEdit(true);
    setIsWarningOpen(false);
  };

  const handleEditLock = () => {
    setCanEdit(false);
  };

  return {
    canEdit,
    isWarningOpen,
    dirtyCount,
    inputFields: decoratedInputFields,
    radioGroups: decoratedRadioGroups,
    switchItems: decoratedSwitchItems,
    handleFieldChange,
    handleRadioChange,
    handleSwitchChange,
    handleWarningOpen,
    handleWarningClose,
    handleWarningConfirm,
    handleEditLock,
  };
};

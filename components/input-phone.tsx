import React, { ChangeEvent, useCallback, useEffect } from "react";

import { Button, Input, Row, Select, Space } from "antd";
import { useState, useMemo } from "react";
import { CountryCodes, CountryCodesType } from "../constants";
import { inputFilter } from "../utils";
import { useDispatch, useSelector } from "react-redux";
import { selectUserState, setUserState, UserState } from "../store/userSlice";

interface PropsType {
  onChange?: (isChecked: boolean) => void;
}

const PhoneInput: React.FC<PropsType> = ({ onChange }) => {
  const userState: UserState = useSelector(selectUserState);
  const dispatch = useDispatch();

  // detect the customer's location to find the most close match
  // default pre-select +852
  const [country, SetCountry] = useState<string>(userState.country);
  const [currentPhone, setCurrentPhone] = useState<string>(userState.phone);
  const [isVerify, setIsVerify] = useState<boolean>(userState.isPhoneVerify);
  const [verifyButtonLoading, setVerifyButtonLoading] = useState<boolean>(false);
  const [formDisabled, setFormDisabled] = useState<boolean>(false);
  const [isChecked, setIsChecked] = useState<boolean>(false);

  const areaCode = useMemo(() => {
    return CountryCodes.find((code) => code["alpha-2"] === country)["dial code"];
  }, [country]);

  const options = useMemo(
    () =>
      CountryCodes.map((code) => ({
        value: code["alpha-2"],
        label: `${code.flag} (${code["dial code"]})`,
      })),
    [CountryCodes]
  );

  const handleVerify = useCallback(async () => {
    setVerifyButtonLoading(true);
    setFormDisabled(true);

    await fetch("/api/verifyPhone", {
      method: "POST",
      body: JSON.stringify({ number: areaCode + currentPhone }),
    })
      .then(async (res) => {
        setVerifyButtonLoading(false);
        setFormDisabled(false);
        setIsChecked(true);
        res.status === 200 ? setIsVerify(true) : setIsVerify(false);
      })
      .catch((error) => {
        throw new Error(error);
      });
  }, [currentPhone, areaCode]);

  const handleChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const phoneValue = e.target.value;
    setCurrentPhone(phoneValue);
    setIsVerify(false);
    if (phoneValue !== currentPhone) {
      setIsChecked(false);
    }
  }, []);

  useEffect(() => {
    onChange(isChecked);
  }, [isChecked]);

  useEffect(() => {
    dispatch(
      setUserState({
        phone: currentPhone,
        areaCode: areaCode,
        country: country,
        isPhoneVerify: isVerify,
      })
    );
  }, [currentPhone, areaCode, isVerify, country]);

  return (
    <Row justify="center" align="middle">
      <Space.Compact style={{ width: "100%" }}>
        <Select
          showSearch
          disabled={formDisabled}
          defaultValue={userState.country}
          options={options}
          optionFilterProp="children"
          filterOption={(input, option) => {
            return (
              CountryCodes.find((code: CountryCodesType) => code["alpha-2"] === option?.value)?.[
                "dial code"
              ].includes(input) ?? false
            );
          }}
          onSelect={(value: string) => SetCountry(value)}
          style={{ width: "40%" }}
        />
        <Input
          type="tel"
          disabled={formDisabled}
          defaultValue={userState.phone}
          onInput={inputFilter}
          onChange={handleChange}
          placeholder="Phone number"
          style={{ width: "60%" }}
          data-testid="phone-input"
        />
        <Button
          loading={verifyButtonLoading}
          disabled={formDisabled}
          type={isVerify ? "default" : "primary"}
          onClick={handleVerify}
          data-testid="phone-verify"
        >
          {isVerify ? (
            <svg
              viewBox="64 64 896 896"
              focusable="false"
              data-icon="check"
              width="1em"
              height="1em"
              fill="green"
              aria-hidden="true"
            >
              <path d="M912 190h-69.9c-9.8 0-19.1 4.5-25.1 12.2L404.7 724.5 207 474a32 32 0 00-25.1-12.2H112c-6.7 0-10.4 7.7-6.3 12.9l273.9 347c12.8 16.2 37.4 16.2 50.3 0l488.4-618.9c4.1-5.1.4-12.8-6.3-12.8z"></path>
            </svg>
          ) : (
            "Verify"
          )}
        </Button>
      </Space.Compact>
    </Row>
  );
};

export default PhoneInput;

import { SelectOptionConfig } from '@shared/types';
import React, { useEffect, useState } from 'react';
import { Label, SearchableSelect } from '../form';
import { RemovableTag } from '@app/components/tag';

type DriverDeliveryAreaIds = string[];

export interface DriverDeliveryAreasSettingsCardProps {
  /** 派送區域下拉選單 */
  deliveryAreaOptions: SelectOptionConfig[];

  /** 司機派送區域列表資料 */
  value?: DriverDeliveryAreaIds;

  /** 司機派送區域列表資料改變事件 */
  onChange?: (driverDeliveryAreas: DriverDeliveryAreaIds) => void;
}

/** 司機派送區域設定 Card Component */
export const DriverDeliveryAreasSettingsCard: React.FC<DriverDeliveryAreasSettingsCardProps> = (props) => {
  /** 派送區域下拉選單 - 選到的當前 deliveryAreaId */
  const [selectedDeliveryArea, setSelectedDeliveryArea] = useState('');

  /** 派送區域下拉選單 */
  const [deliveryAreaOptions, setDeliveryAreaOptions] = useState(props.deliveryAreaOptions);

  /** 司機派送區域列表 */
  const [driverDeliveryAreas, setDriverDeliveryAreas] = useState(props.value || []);

  const handleTagAppend = () => {
    if (!driverDeliveryAreas.includes(selectedDeliveryArea)) {
      const ids = driverDeliveryAreas.concat(selectedDeliveryArea);

      if (!props.value) {
        setDriverDeliveryAreas(ids);
      }

      if (props.onChange) {
        props.onChange(ids);
      }
    }

    // 點擊添加按鈕後，清空下拉選單的值
    setSelectedDeliveryArea('');
  };

  /** 移除 Tag */
  const removeTag = (deliveryAreaId: string) => {
    const areaIds = driverDeliveryAreas.filter((id) => id !== deliveryAreaId);
    setDriverDeliveryAreas(areaIds);

    if (props.onChange) {
      props.onChange(areaIds);
    }
  };

  // driverDeliveryAreas 綁定外部 value
  useEffect(() => {
    if (props.value) {
      setDriverDeliveryAreas(props.value);
    }
  }, [props.value]);

  // 同步派送區域下拉選單
  useEffect(() => {
    setDeliveryAreaOptions(props.deliveryAreaOptions);
  }, [props.deliveryAreaOptions]);

  return (
    <div className="card">
      <div className="card-header">
        <div className="row">
          <div className="col-12">
            <Label htmlFor="deliveryAreas">派送區域</Label>
          </div>
          <div className="col-12 col-sm-9">
            <SearchableSelect
              id="deliveryAreas"
              name="deliveryAreas"
              options={deliveryAreaOptions}
              onChange={(id) => setSelectedDeliveryArea(id)}
              value={selectedDeliveryArea}
            />
          </div>
          <div className="col-12 col-sm-3">
            <button type="button" className="btn btn-primary" disabled={!selectedDeliveryArea} onClick={handleTagAppend}>
              添加
            </button>
          </div>
        </div>
      </div>
      <div className="card-body">
        <p>{`筆數: ${driverDeliveryAreas.length}`}</p>
        {driverDeliveryAreas.map((deliveryAreaId) => (
          <RemovableTag variant="primary" key={deliveryAreaId} onTagRemove={() => removeTag(deliveryAreaId)}>
            {deliveryAreaOptions.find((v) => v.value === deliveryAreaId)?.text}
          </RemovableTag>
        ))}
      </div>
    </div>
  );
};

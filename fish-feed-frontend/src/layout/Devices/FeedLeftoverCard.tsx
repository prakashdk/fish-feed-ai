import type { DeviceDto } from "@/common/dto/Device.dto";
import { InsetCard } from "../../components/InsetCard";
import { Card } from "../../components/Card";
import { FaFish } from "react-icons/fa";

interface FeedLeftoverAttributes {
  fishFeedRemaining: string;
}

type FeedLeftoverCardProps = {
  device: DeviceDto<FeedLeftoverAttributes>;
};

export const FeedLeftoverCard = ({ device }: FeedLeftoverCardProps) => {
  return (
    <Card>
      <h3 className="text-xl font-semibold mb-4">Feed Monitor #{device.id}</h3>

      <InsetCard>
        <FaFish className="text-orange-400 text-2xl" />
        <div>
          <p className="text-xs opacity-70">Fish Feed Remaining</p>
          <p className="font-medium">{device.data.fishFeedRemaining}</p>
        </div>
      </InsetCard>
    </Card>
  );
};

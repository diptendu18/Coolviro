import ServicePageTemplate from '@/components/services/ServicePageTemplate';
import { getServiceBySlug } from '@/data/services';

const service = getServiceBySlug('washing-machine-service');

export default function WashingMachineServicePage() {
  return <ServicePageTemplate service={service} />;
}

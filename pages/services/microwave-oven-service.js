import ServicePageTemplate from '@/components/services/ServicePageTemplate';
import { getServiceBySlug } from '@/data/services';

const service = getServiceBySlug('microwave-oven-service');

export default function MicrowaveOvenServicePage() {
  return <ServicePageTemplate service={service} />;
}

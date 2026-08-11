import ServicePageTemplate from '@/components/services/ServicePageTemplate';
import { getServiceBySlug } from '@/data/services';

const service = getServiceBySlug('geyser-service');

export default function GeyserServicePage() {
  return <ServicePageTemplate service={service} />;
}

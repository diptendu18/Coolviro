import ServicePageTemplate from '@/components/services/ServicePageTemplate';
import { getServiceBySlug } from '@/data/services';

const service = getServiceBySlug('ac-service');

export default function ACServicePage() {
  return <ServicePageTemplate service={service} />;
}

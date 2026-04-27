const HUBSPOT_REGION = process.env.HUBSPOT_REGION ?? 'na2';
const HUBSPOT_API_BASE = `https://api-${HUBSPOT_REGION}.hsforms.com/submissions/v3/integration/submit`;

export interface HubSpotField {
  objectTypeId: '0-1';
  name: string;
  value: string;
}

export interface HubSpotContext {
  pageUri?: string;
  pageName?: string;
  ipAddress?: string;
  hutk?: string;
}

export interface SubmitFormParams {
  portalId: string;
  formId: string;
  fields: HubSpotField[];
  context?: HubSpotContext;
}

export interface FieldError {
  field: string;
  message: string;
}

export type SubmitFormResult =
  | { ok: true }
  | { ok: false; errors: FieldError[] };

interface HubSpotErrorResponse {
  status: string;
  message: string;
  correlationId: string;
  errors?: Array<{
    message: string;
    errorType?: string;
  }>;
}

const ERROR_MESSAGE_MAP: Record<string, string> = {
  INVALID_EMAIL: 'Please enter a valid email address.',
  BLOCKED_EMAIL: 'This email address cannot be used.',
  INVALID_NUMBER: 'Please enter a valid phone number.',
  INPUT_TOO_LARGE: 'This field exceeds the maximum length.',
  REQUIRED_FIELD: 'This field is required.',
  NUMBER_OUT_OF_RANGE: 'This number is out of range.',
  VALUE_NOT_IN_OPTIONS: 'Please select a valid option.',
};

function mapHubSpotError(error: { message: string; errorType?: string }): FieldError {
  const fieldMatch = error.message.match(/Error in '([^']+)'/);
  const field = fieldMatch?.[1] ?? 'form';

  const errorType = error.errorType ?? '';
  const userMessage = ERROR_MESSAGE_MAP[errorType] ?? 'Please check this field and try again.';

  return { field, message: userMessage };
}

export async function submitForm({
  portalId,
  formId,
  fields,
  context,
}: SubmitFormParams): Promise<SubmitFormResult> {
  const url = `${HUBSPOT_API_BASE}/${portalId}/${formId}`;

  const body = {
    fields,
    context: context ?? {},
  };

  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (response.ok) {
      return { ok: true };
    }

    const errorData = (await response.json()) as HubSpotErrorResponse;
    console.error('[HubSpot] Form submission error:', JSON.stringify(errorData, null, 2));

    if (errorData.errors && errorData.errors.length > 0) {
      const fieldErrors = errorData.errors.map(mapHubSpotError);
      return { ok: false, errors: fieldErrors };
    }

    return {
      ok: false,
      errors: [{ field: 'form', message: 'Submission failed. Please try again.' }],
    };
  } catch (error) {
    console.error('[HubSpot] Network error:', error);
    return {
      ok: false,
      errors: [{ field: 'form', message: 'Unable to submit. Please try again later.' }],
    };
  }
}

export function buildField(name: string, value: string): HubSpotField {
  return {
    objectTypeId: '0-1',
    name,
    value: value.trim(),
  };
}

export function normalizeEmail(email: string): string {
  return email.trim().toLowerCase();
}

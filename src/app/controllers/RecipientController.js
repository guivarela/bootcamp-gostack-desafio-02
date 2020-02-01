import * as Yup from 'yup';
import Recipient from '../models/Recipient';

class RecipientController {
  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      street_name: Yup.string().required(),
      number: Yup.number()
        .required()
        .positive(),
      address_line: Yup.string(),
      state: Yup.string()
        .required()
        .length(2),
      city: Yup.string().required(),
      zip_code: Yup.string()
        .required()
        .length(8),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const {
      id,
      name,
      street_name,
      number,
      address_line,
      state,
      city,
      zip_code,
    } = await Recipient.create(req.body);

    return res.json({
      id,
      name,
      street_name,
      number,
      address_line,
      state,
      city,
      zip_code,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      street_name: Yup.string(),
      number: Yup.number().positive(),
      address_line: Yup.string(),
      state: Yup.string().length(2),
      city: Yup.string(),
      zip_code: Yup.string().length(8),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation failed' });
    }

    const { id } = req.params;

    const recipient = await Recipient.findByPk(id);

    if (!recipient) {
      return res.status(404).json({ error: 'Recipient not found' });
    }

    const {
      name,
      street_name,
      number,
      address_line,
      state,
      city,
      zip_code,
    } = await recipient.update(req.body);

    return res.json({
      id,
      name,
      street_name,
      number,
      address_line,
      state,
      city,
      zip_code,
    });
  }
}

export default new RecipientController();

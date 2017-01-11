import stripe
from stripe.test.helper import StripeResourceTest


class SourceTest(StripeResourceTest):

    def test_retrieve_resource(self):
        stripe.Source.retrieve("src_foo")
        self.requestor_mock.request.assert_called_with(
            'get',
            '/v1/sources/src_foo',
            {},
            None
        )

    def test_create_source(self):
        stripe.Source.create(type="bitcoin", amount=1000, currency="usd",
                             owner={"email": "jenny.rosen@example.com"})
        self.requestor_mock.request.assert_called_with(
            'post',
            '/v1/sources',
            {
                'type': 'bitcoin',
                'amount': 1000,
                'currency': 'usd',
                'owner': {'email': 'jenny.rosen@example.com'}
            },
            None
        )

    def test_verify_source(self):
        source = stripe.Source.construct_from({
            'id': 'src_foo',
            'type': 'ach_debit'
        }, 'api_key')
        source.verify(values=[32, 45])
        self.requestor_mock.request.assert_called_with(
            'post',
            '/v1/sources/src_foo/verify',
            {
                'values': [32, 45],
            },
            None
        )

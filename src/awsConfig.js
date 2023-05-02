import AWS from "aws-sdk";

const AWSConfig = {
  region: "us-east-1",
  accessKeyId: "ASIA3L4S2WA5W6KJR7VK",
  secretAccessKey: "GCLVi3ZnlbGvZZ8bIdrZ3PhQsCe44gzMTUkQaPaD",
  sessionToken:"FwoGZXIvYXdzEMb//////////wEaDDKWe3fABlW89vRK8iLIATPArmhp+vxf9kAeeoWJOuXqq6DBNaHVauaZyvmjcAw2f82pk6bjHjq4APEQigMf55QMv4SYBNNC2r6ZfxvYIAX+FGdkoXyMdJDoj4CJBoP4DewrsKg77HJgZiCZ6dwHJo2H6RIdu7sdknKYrAIo5MKMuIb33vWCug/myzyICrYB0DMLULkGGe1BxA16MTw1Zi1VlRG0SWYY3CRBvyh0E09FUyIDwwQdQtQvat+9RfVqlyyyuRsyMm/6aZWWZoS4ArWsdzMfl4ubKK78w6IGMi1BP2NQtYn1Cr2Qpbi3HPMRb7p+2NZarCbjRIfi6I6BrVd3iF5YMpid42aqceg="
};

AWS.config.update(AWSConfig);

export default AWS;